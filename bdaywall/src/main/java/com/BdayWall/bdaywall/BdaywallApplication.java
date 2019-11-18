package com.BdayWall.bdaywall;

import ch.qos.logback.core.net.SyslogOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * @author kopal Choure
 */
@SpringBootApplication
@ComponentScan
public class BdaywallApplication {
	/**
	 * Main spring boot application class.
	 *
	 * @param args The command line arguments.
	 */

	public static void main(String[] args) {

		SpringApplication.run(BdaywallApplication.class, args);
		System.out.println("started");
	}
}
