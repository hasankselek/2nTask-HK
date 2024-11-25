package stepDefinitions.hooks;

import io.cucumber.java.After;
import io.cucumber.java.Scenario;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import utilities.Driver;
import utilities.ReusableMethods;

import java.io.IOException;

public class Hooks {


    @After
	public void tearDown(Scenario scenario) {
		final byte[] screenshot = ((TakesScreenshot) Driver.getDriver()).getScreenshotAs(OutputType.BYTES);
		if (scenario.isFailed()) {
			try {
				ReusableMethods.takeScreenshot(scenario.getName());
			}
			catch (IOException e) {
				throw new RuntimeException(e);
			}
			scenario.attach(screenshot, "image/png", scenario.getName());
		}
		Driver.closeDriver();
	}



}
