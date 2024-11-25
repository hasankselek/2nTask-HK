package pages;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.Assert;
import utilities.JSUtilities;
import utilities.ReusableMethods;

import java.util.List;

public class NewsPage extends BasePage{

    @FindBy(xpath = "(//div[@class='cmsmasters-widget-image__wrap'])")
    private List<WebElement> newsList;


    public void selectSearchResultNews(int number){

        // Elementi görünür yapmak için kaydır
        ReusableMethods.scrollToElement(driver, newsList.get(number));

        // Elementin görünür olmasını bekle
        wait.until(ExpectedConditions.visibilityOf(newsList.get(number)));

        ReusableMethods.hardWait(2);

        // Elementi tıklamayı dene
        ReusableMethods.hoverOver(newsList.get(number));

        // Elementin tıklanabilirliğini ve görünürlüğünü doğrular
        Assert.assertTrue(newsList.get(number).isEnabled());
        Assert.assertTrue(newsList.get(number).isDisplayed());

        // Elemente tıklar
        newsList.get(number).click();

        }

    public void verifyNewsHeader(){

        String expectedTitle = "Aydınlatma Metni".toLowerCase();

        String actualTitle = driver.getTitle().toLowerCase();

        // Haberin title'ı haberi içeriyor mu diye kontrol eder
        Assert.assertTrue(actualTitle.contains(expectedTitle));
    }

    }



