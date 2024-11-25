package pages;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.WebDriverWait;
import utilities.ConfigLoader;
import utilities.Driver;

import java.time.Duration;


public abstract class BasePage {
    protected JavascriptExecutor js;
    protected static WebDriver driver;
    protected Actions actions;
    protected WebDriverWait wait;
    protected ConfigLoader configLoader;


    public BasePage() {
        js = (JavascriptExecutor) driver;
        driver = Driver.getDriver();
        PageFactory.initElements(driver, this);
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        actions = new Actions(driver);
        wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        configLoader = new ConfigLoader();

    }


}
