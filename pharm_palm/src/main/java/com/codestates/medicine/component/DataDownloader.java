package com.codestates.medicine.component;

import com.codestates.medicine.repository.MedicineRepository;
import com.codestates.medicine.entity.Medicine;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataDownloader implements CommandLineRunner {
    private final MedicineRepository medicineRepository;

    private final RestTemplate restTemplate;

    public DataDownloader(MedicineRepository medicineRepository, RestTemplateBuilder restTemplateBuilder) {
        this.medicineRepository = medicineRepository;
        this.restTemplate = restTemplateBuilder
                .additionalMessageConverters(new StringHttpMessageConverter(Charset.forName("UTF-8")))
                .build();
        this.restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
    }

    @Override
    public void run(String... args) throws Exception {
        int pageNo = 1;
        int numOfRows = 100;
        int totalCount = 0;


        while (true) {
            String urlStr = "http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList";
            String serviceKey = "Cosi44ZLAOo9DDnDo82hBiYUJwZ0xDxuctDg+ZOrhDgwtdARvhbSKhjXsj5xsujCP8AuiGqEUPZlndh8HlOQXQ==";
            String type = "json";
            String encodedServiceKey = URLEncoder.encode(serviceKey, "UTF-8");



            URI uri = UriComponentsBuilder.fromHttpUrl(urlStr)
                    .queryParam("serviceKey", encodedServiceKey)
                    .queryParam("pageNo", pageNo)
                    .queryParam("numOfRows", numOfRows)
                    .queryParam("type", type)
                    .build(true)
                    .toUri();
            ResponseEntity<String> responseEntity = restTemplate.getForEntity(uri, String.class);

            //API 응답 데이터 처리
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(responseEntity.getBody());
            JsonNode dataNode = jsonNode.get("body").get("items");



<<<<<<< HEAD:pharm_palm/src/main/java/com/codestates/member/controller/medicine/component/DataDownloader.java
            if (dataNode == null || dataNode.size() == 0 || totalCount > 2000) {
=======
            if (dataNode == null || dataNode.size() == 0 || totalCount > 1000) {
>>>>>>> ff462ca35fbaa3d106d6104db435c601196cd146:pharm_palm/src/main/java/com/codestates/medicine/component/DataDownloader.java
                break;
            }

            List<Medicine> medicines = new ArrayList<>();
            for (JsonNode row : dataNode) {
                Medicine medicine = new Medicine();
                String itemName = row.get("itemName").asText();
                int leftParenthesisIndex = itemName.indexOf("(");
                if (leftParenthesisIndex != -1) {
                    medicine.setMedicineIngredient(itemName.substring(leftParenthesisIndex + 1, itemName.length() - 1));
                    medicine.setMedicineName(itemName.substring(0, leftParenthesisIndex));
                } else {
                    medicine.setMedicineIngredient(itemName);
                    medicine.setMedicineName(itemName);
                }
                String useMethodQesitm = row.get("useMethodQesitm").asText();
                useMethodQesitm = useMethodQesitm.replaceAll("<p>", "");
                useMethodQesitm = useMethodQesitm.replaceAll("</p>", "");
                useMethodQesitm = useMethodQesitm.replaceAll("<br />", "");
                useMethodQesitm = useMethodQesitm.replaceAll("<sub>", "");
                useMethodQesitm = useMethodQesitm.replaceAll("</sub>", "");
                useMethodQesitm = useMethodQesitm.replaceAll("<sup>", "");
                useMethodQesitm = useMethodQesitm.replaceAll("</sup>", "");
                useMethodQesitm = useMethodQesitm.replaceAll("\\n", "");
                medicine.setMedicineUse(useMethodQesitm);

                medicine.setMedicineLike(0L);
                medicine.setMedicineImg(row.get("itemImage").asText());

                medicines.add(medicine);
            }

            medicineRepository.saveAll(medicines);
            pageNo += 1;
            totalCount += dataNode.size();
            System.out.println("totalCount: " + totalCount);
        }

    }
}
