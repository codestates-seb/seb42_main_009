package com.codestates.auth.utils;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;

public class TimeConvertor {
    public static Date convertToZone(LocalDateTime localDateTime, String fromZone, String toZone) {
        ZonedDateTime zonedDateTime = localDateTime.atZone(ZoneId.of(fromZone))
                .withZoneSameInstant(ZoneId.of(toZone));
        return Date.from(zonedDateTime.toInstant());
    }
}
