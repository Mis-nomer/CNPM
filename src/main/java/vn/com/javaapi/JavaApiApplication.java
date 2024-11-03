package vn.com.javaapi;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@Slf4j
@SpringBootApplication
@ComponentScan({"vn.com.javaapi.*"})
public class JavaApiApplication {

	public static void main(String[] args) {
        System.out.println("SHOP ban hang");
        log.info("Starting note app with configuration");
        MDC.put("tracking", NanoIdUtils.randomNanoId());
		SpringApplication.run(JavaApiApplication.class, args);
	}

}
