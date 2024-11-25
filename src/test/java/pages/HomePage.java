package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.*;
import org.testng.Assert;
import utilities.ReusableMethods;

import java.util.List;

public class HomePage extends BasePage{

    public HomePage() {
        super();
    }

    @FindBy(css = ".elementor-widget-cmsmasters-search__popup-trigger-inner")
    private WebElement searchIcon;

    @FindBy(xpath = "//input[@type='search']")
    private WebElement searchBar;

    @FindBy(css = "ul#menu-1-5dc673f1 > li")
    private List<WebElement> mainMenuItems; // navbardaki ana başlıkların locatei


    public void checkNavBarElements() {

        for (int i = 0; i < mainMenuItems.size(); i++) {

            Assert.assertTrue(mainMenuItems.get(i).isDisplayed());
            Assert.assertTrue(mainMenuItems.get(i).isEnabled());

            // navbardaki ana başlıkların üzerine gelir
            actions.moveToElement(mainMenuItems.get(i)).perform();

            // Ana menü elemanına tıkla
            mainMenuItems.get(i).click();

            // Navbardaki main menülerinin titleini doğrular
            String mainMenuName = mainMenuItems.get(i).getText().toLowerCase();
            String pageTitle = driver.getTitle().toLowerCase();
            Assert.assertTrue(pageTitle.contains(mainMenuName));

            // Alt menüleri dinamik olarak bul
            List<WebElement> subMenuItems = driver.findElements(By.cssSelector(
                    "ul#menu-1-5dc673f1 > li:nth-child(" + (i + 1) + ") ul.sub-menu > li > a"));

            for (int j = 0; j < subMenuItems.size(); j++) {

                // Navbardaki ana menü elemanını hover yap
                actions.moveToElement(mainMenuItems.get(i)).perform();

                // Alt menü elemanını hover yap
                actions.moveToElement(subMenuItems.get(j)).perform();

                Assert.assertTrue(subMenuItems.get(j).isDisplayed());
                Assert.assertTrue(subMenuItems.get(j).isEnabled());

                // Alt menü elemanına tıkla
                subMenuItems.get(j).click();

                ReusableMethods.waitForPageToLoad(1);

                // Alt menüleri yeniden al
                subMenuItems = driver.findElements(By.cssSelector(
                        "ul#menu-1-5dc673f1 > li:nth-child(" + (i + 1) + ") ul.sub-menu > li > a"));

                // Navbardaki main menülerin altındaki submenülerin titleini doğrular
                String subMenuName = subMenuItems.get(j).getText().toLowerCase();
                pageTitle = driver.getTitle().toLowerCase();
                Assert.assertTrue(pageTitle.contains(subMenuName));
            }
        }
    }

    public void clickSearchIcon(){
        searchIcon.click();
    }

    public void enterTextAndSearch(String searchContent){

        searchBar.click();
        searchBar.sendKeys(searchContent);
        searchBar.submit();
    }


}


