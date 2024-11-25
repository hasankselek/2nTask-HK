package stepDefinitions;

import org.openqa.selenium.WebDriver;
import utilities.Driver;
import utilities.Pages;

public abstract class BaseStep {

	protected final WebDriver DRIVER;

	protected static Pages PAGES;

	public BaseStep() {
		DRIVER = Driver.getDriver();
		PAGES = new Pages();
	}





}



