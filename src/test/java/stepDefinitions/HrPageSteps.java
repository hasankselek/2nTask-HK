package stepDefinitions;

import io.cucumber.datatable.DataTable;
import io.cucumber.java.en.*;


public class HrPageSteps extends BaseStep{

    @And("User fills in required information and upload CV")
    public void userFillsInRequiredInformationAndUploadCV(DataTable dataTable) {
        PAGES.getHrPage().fillPersonelInformation(dataTable);
    }

    @And("Click next arrow")
    public void clickNextArrow() {
        PAGES.getHrPage().clickNextArrow();
    }

    @And("User selects the desired job position {string}")
    public void userSelectsTheDesiredJobPosition(String jobPosition) {
        PAGES.getHrPage().selectJobPosition(jobPosition);
    }

    @And("User clicks Gönder button")
    public void userClicksGönderButton() {
        PAGES.getHrPage().clickGonderButton();
    }

    @Then("User verifies that success message is displayed")
    public void userVerifiesThatSuccessMessageIsDisplayed() {
        PAGES.getHrPage().verifySuccessMessage();
    }
}
