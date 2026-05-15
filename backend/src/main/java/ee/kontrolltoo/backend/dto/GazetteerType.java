package ee.kontrolltoo.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GazetteerType {
    private Long typeID;
    private String type;
    private String description;
}