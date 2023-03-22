package com.codestates.disease;

import com.codestates.disease.entity.Disease;
import com.codestates.disease.repository.DiseaseRepository;
import lombok.Getter;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;
@Getter
@Component
public class DiseasesData implements CommandLineRunner {
    private final DiseaseRepository diseaseRepository;

    public DiseasesData(DiseaseRepository diseaseRepository) {
        this.diseaseRepository = diseaseRepository;
    }

    public void run(String... args) throws Exception {
        List<Disease> diseaseList = List.of(
                new Disease(1L, "소화불량"),
                new Disease(2L, "구토"),
                new Disease(3L, "사마귀"),
                new Disease(4L, "체함"),
                new Disease(5L, "위통"),
                new Disease(6L, "구역"),
                new Disease(7L, "위산과다"),
                new Disease(8L, "식욕감퇴"),
                new Disease(9L, "속쓰림"),
                new Disease(10L, "기침"),
                new Disease(11L, "가래"),
                new Disease(12L, "천식"),
                new Disease(13L, "두드러기"),
                new Disease(14L, "알레르기 비염"),
                new Disease(15L, "재채기"),
                new Disease(16L, "콧물"),
                new Disease(17L, "습진"),
                new Disease(18L, "피부염"),
                new Disease(19L, "졸음"),
                new Disease(20L, "피로회복"),
                new Disease(21L, "근육통"),
                new Disease(22L, "신경통"),
                new Disease(23L, "위염"),
                new Disease(24L, "벌레 물린데"),
                new Disease(25L, "건조한 눈"),
                new Disease(26L, "화상"),
                new Disease(27L, "발열"),
                new Disease(28L, "코막힘"),
                new Disease(29L, "눈물"),
                new Disease(30L, "멀미"),
                new Disease(31L, "어지러움"),
                new Disease(32L, "설사"),
                new Disease(33L, "치질"),
                new Disease(34L, "두통"),
                new Disease(35L, "인후통"),
                new Disease(36L, "생리통"),
                new Disease(37L, "오한"),
                new Disease(38L, "변비"),
                new Disease(39L, "관절염"),
                new Disease(40L, "코감기"),
                new Disease(41L, "편도염"),
                new Disease(42L, "구내염"),
                new Disease(43L, "결막염"),
                new Disease(44L, "상처"),
                new Disease(45L, "타박상"),
                new Disease(46L, "불면증"),
                new Disease(47L, "여드름"),
                new Disease(48L, "탈모"),
                new Disease(49L, "소독"),
                new Disease(50L, "포진"),
                new Disease(51L, "무좀"),
                new Disease(52L, "금연"),
                new Disease(53L, "빈혈")
        );
        diseaseRepository.saveAll(diseaseList);
    }
}
