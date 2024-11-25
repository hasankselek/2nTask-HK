package pages;

import io.cucumber.datatable.DataTable;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.*;
import utilities.ReusableMethods;

import java.util.Map;

import static org.testng.Assert.*;

public class HrPage extends BasePage{

    CommonPage commonPage = new CommonPage();

    @FindBy(css = "#name")
    private WebElement nameSurnameBox;

    @FindBy(css = "#birth")
    private WebElement birthBox;

    @FindBy(css = "#tcKimlik")
    private WebElement tcKimlikBox;

    @FindBy(css = "#phone")
    private WebElement phoneBox;

    @FindBy(css = "#email")
    private WebElement emailBox;

    @FindBy(xpath = "//input[@id='cv_field']")
    private WebElement cvBox;

    @FindBy(xpath = "//button[@aria-label='Go to the next step']")
    private WebElement nextArrow;

    @FindBy(xpath = "(//div[normalize-space()='Gönder'])[2]")
    private WebElement gonderButton;

    @FindBy(xpath = "//p[normalize-space()='Form Başarı ile gönderildi. Katıldığınız için teşekkür ederiz.']")
    private WebElement registerSuccessText;

    public void fillPersonelInformation(DataTable dataTable){
        Map<String, String> informationDetails = dataTable.asMap(String.class, String.class);
        nameSurnameBox.sendKeys(informationDetails.get("AdSoyad"));
        birthBox.sendKeys(informationDetails.get("DogumTarihi"));
        tcKimlikBox.sendKeys(informationDetails.get("TCKimlik"));
        phoneBox.sendKeys(informationDetails.get("CepTelefonu"));
        emailBox.sendKeys(informationDetails.get("MailAdresi"));
        ReusableMethods.uploadFile(configLoader.getConfigValue("cvPDF"),cvBox);
        commonPage.selectWithNormalizeText(informationDetails.get("EgitimBilgileri"));
    }

    public void clickNextArrow(){
        nextArrow.click();
    }

    public void selectJobPosition(String jobPosition){
        commonPage.selectWithNormalizeTextSpan(jobPosition);
    }

    public void clickGonderButton(){
        gonderButton.click();
    }

    public void verifySuccessMessage(){
        assertTrue(registerSuccessText.isDisplayed());
    }


}
