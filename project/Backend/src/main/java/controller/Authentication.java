package controller;
import business.UsersManager;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.POST;


@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@RestController
public class Authentication {

    @RequestMapping(method = POST, value = "/login")
    public ResponseEntity<Object> login(@RequestBody String b) {
        Map body = Util.jsonToMap(b);
        String username = ((String) body.get("username"));
        String password = (String) body.get("password");

        try {
            String token = UsersManager.login(username, password);
            return Util.ok(token);
        }
        catch (Exception e) {
            return Util.badRequest(e.getMessage());
        }
    }


    @RequestMapping(method = POST, value = "/register")
    public ResponseEntity<Object> register(@RequestBody String b) {
        Map body = Util.jsonToMap(b);
        String email = (String) body.get("email");
        String username = (String) body.get("username");
        String name = (String) body.get("name");
        String password = (String) body.get("password");
        String country = (String) body.get("country");
        String d = (String) body.get("birthdate");
        LocalDate birthdate = LocalDate.parse(d.substring(0, d.length()-2), DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        char gender = ((String) body.get("gender")).charAt(0);

        try {
            String r = UsersManager.registerUser(email, username, name, password, country, birthdate, gender);
            return Util.ok(r);
        }
        catch (Exception e) {
            return Util.badRequest(e.getMessage());
        }
    }

    @RequestMapping(method = POST, value = "/logout")
    public ResponseEntity<Object> logout(@RequestBody String b) {
        Map result = Util.jsonToMap(b);
        String token = (String) result.get("token");

        try {
            UsersManager.logout(token);
            return null;
        }
        catch (Exception e) {
            return Util.badRequest(e.getMessage());
        }
    }
}