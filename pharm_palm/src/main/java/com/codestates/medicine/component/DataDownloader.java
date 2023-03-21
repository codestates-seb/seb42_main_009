//package com.codestates.medicine.component;
//
//import com.codestates.medicine.entity.Medicine;
//import com.codestates.medicine.repository.MedicineRepository;
//import com.fasterxml.jackson.databind.JsonNode;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.boot.web.client.RestTemplateBuilder;
//import org.springframework.http.ResponseEntity;
//import org.springframework.http.converter.StringHttpMessageConverter;
//import org.springframework.stereotype.Component;
//import org.springframework.web.client.RestTemplate;
//import org.springframework.web.util.UriComponentsBuilder;
//
//import java.net.URI;
//import java.net.URLEncoder;
//import java.nio.charset.Charset;
//import java.util.ArrayList;
//import java.util.List;
//
//@Component
//public class DataDownloader implements CommandLineRunner {
//    private final MedicineRepository medicineRepository;
//
//    private final RestTemplate restTemplate;
//
//    public DataDownloader(MedicineRepository medicineRepository, RestTemplateBuilder restTemplateBuilder) {
//        this.medicineRepository = medicineRepository;
//        this.restTemplate = restTemplateBuilder
//                .additionalMessageConverters(new StringHttpMessageConverter(Charset.forName("UTF-8")))
//                .build();
//        this.restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
//    }
//
//    @Override
//    public void run(String... args) throws Exception {
//        int pageNo = 1;
//        int numOfRows = 100;
//        int totalCount = 0;
//
//
//        while (true) {
//            String urlStr = "http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList";
//            String serviceKey = "Cosi44ZLAOo9DDnDo82hBiYUJwZ0xDxuctDg+ZOrhDgwtdARvhbSKhjXsj5xsujCP8AuiGqEUPZlndh8HlOQXQ==";
//            String type = "json";
//            String encodedServiceKey = URLEncoder.encode(serviceKey, "UTF-8");
//
//
//
//            URI uri = UriComponentsBuilder.fromHttpUrl(urlStr)
//                    .queryParam("serviceKey", encodedServiceKey)
//                    .queryParam("pageNo", pageNo)
//                    .queryParam("numOfRows", numOfRows)
//                    .queryParam("type", type)
//                    .build(true)
//                    .toUri();
//            ResponseEntity<String> responseEntity = restTemplate.getForEntity(uri, String.class);
//            //restTemplate 날 것 x -> 가공해서, 인터페이스화, wrapper 클래스  ==> 에러핸들링 공통처리.
//            //요청할 때 여러 정보들을 공통으로 제어 할 수 있다면, 다른 사람이 재사용하기 좋다.
//            // if 하루에 한번씩 업데이트 될 수 있다면? ==> DB의 기존데이터와 체크 ==> 바뀐 것만 수정하고 싶다면?, 새로 싹 밀고 받기
//
//
//            //API 응답 데이터 처리
//            ObjectMapper objectMapper = new ObjectMapper();
//            JsonNode jsonNode = objectMapper.readTree(responseEntity.getBody());
//            JsonNode dataNode = jsonNode.get("body").get("items");
//
//
//
//            if (dataNode == null || dataNode.size() == 0 || totalCount > 4500) {
//                break;
//            }
//
//            List<Medicine> medicines = new ArrayList<>();
//            for (JsonNode row : dataNode) {
//                Medicine medicine = new Medicine();
//                String itemName = row.get("itemName").asText();
//                int leftParenthesisIndex = itemName.indexOf("(");
//                if (leftParenthesisIndex != -1) {
//                    medicine.setMedicineIngredient(itemName.substring(leftParenthesisIndex + 1, itemName.length() - 1));
//                    medicine.setMedicineName(itemName.substring(0, leftParenthesisIndex));
//                } else {
//                    medicine.setMedicineIngredient(itemName);
//                    medicine.setMedicineName(itemName);
//                }
//                String efcyQesitm = row.get("efcyQesitm").asText();
//                efcyQesitm = efcyQesitm.replaceAll("이 약은 ", "");
//                efcyQesitm = efcyQesitm.replaceAll("<p>", "");
//                efcyQesitm = efcyQesitm.replaceAll("</p>", "");
//                efcyQesitm = efcyQesitm.replaceAll("<br />", "");
//                efcyQesitm = efcyQesitm.replaceAll("<sub>", "");
//                efcyQesitm = efcyQesitm.replaceAll("</sub>", "");
//                efcyQesitm = efcyQesitm.replaceAll("<sup>", "");
//                efcyQesitm = efcyQesitm.replaceAll("</sup>", "");
//                efcyQesitm = efcyQesitm.replaceAll("\\n", "");
//                medicine.setMedicineUse(efcyQesitm);
//
//
//                medicine.setMedicineLike(0L);
//                medicine.setMedicineImg(row.get("itemImage").asText());
//                medicine.setMedicineEntp(row.get("entpName").asText());
//
//                String atpnQesitm = row.get("atpnQesitm").asText();
//                atpnQesitm = atpnQesitm.replaceAll("<p>", "");
//                atpnQesitm = atpnQesitm.replaceAll("</p>", "");
//                atpnQesitm = atpnQesitm.replaceAll("\\n", "");
//                medicine.setMedicineWarn(atpnQesitm);
//
//                String depositMethodQesitm = row.get("depositMethodQesitm").asText();
//                depositMethodQesitm = depositMethodQesitm.replaceAll("<p>", "");
//                depositMethodQesitm = depositMethodQesitm.replaceAll("</p>", "");
//                depositMethodQesitm = depositMethodQesitm.replaceAll("\\n", "");
//                medicine.setMedicineDeposit(depositMethodQesitm);
//
//                medicines.add(medicine);
//            }
//
//            medicineRepository.saveAll(medicines);
//            pageNo += 1;
//            totalCount += dataNode.size();
//            System.out.println("totalCount: " + totalCount);
//        }
//
//    }
//}
