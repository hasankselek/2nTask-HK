package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import static org.testng.Assert.*;

public class CommonPage extends BasePage{


    // Anasayfa doğrulama
    public void verifyHomePageIsDisplayed(String url) {
        String expectedUrl = driver.getCurrentUrl();
        assertEquals(configLoader.getConfigValue(url),expectedUrl);
    }

    //button tagi ile text tıklama
    public void selectWithNormalizeText(String normalizeText){
        WebElement text = driver.findElement(By.xpath("//button[normalize-space()='"+normalizeText+"']"));
        text.click();
    }

    //span tagi ile text tıklama
    public void selectWithNormalizeTextSpan(String normalizeText){
        WebElement text = driver.findElement(By.xpath("//span[normalize-space()='"+normalizeText+"']"));
        text.click();
    }




}


