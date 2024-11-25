package stepDefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import utilities.ConfigLoader;

public class CommonSteps extends BaseStep{

    ConfigLoader configLoader = new ConfigLoader();

    @Given("User opens {string}")
    public void user_opens(String url) {

        DRIVER.get(configLoader.getConfigValue(url));
    }

    @Then("Verifies access to {string} page")
    public void verifiesAccessTPage(String url) {

        PAGES.getCommonPage().verifyHomePageIsDisplayed(url);
    }
}
