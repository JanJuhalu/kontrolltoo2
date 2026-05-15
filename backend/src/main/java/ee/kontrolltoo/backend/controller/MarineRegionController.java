package ee.kontrolltoo.backend.controller;

import ee.kontrolltoo.backend.dto.GazetteerType;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class MarineRegionController {

    private RestTemplate restTemplate = new RestTemplate();

    @GetMapping("gazetteer-types")
    public List<GazetteerType> getGazetteerTypes() {
        String url = "https://marineregions.org/rest/getGazetteerTypes.json";
        GazetteerType[] response = restTemplate.exchange(url, HttpMethod.GET, null, GazetteerType[].class).getBody();
        return Arrays.asList(response);
    }
}