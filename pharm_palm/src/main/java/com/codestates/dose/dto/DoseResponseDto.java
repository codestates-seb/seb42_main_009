package com.codestates.dose.dto;

import com.codestates.dose.entity.Dose;
import lombok.*;

import javax.validation.constraints.NotBlank;
import java.sql.Time;
import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DoseResponseDto {
    private long doseId;
    private long memberId;
    private long medicineId;
    private String medicineName;
    private String doseMount;
    private int doseNumber;
    private String doseTimes;


}
