package stepDefinitions;

import io.cucumber.java.en.*;

public class HomePageSteps extends BaseStep{

    @Then("The user clicks on all navbar elements and verifies that the pages open smoothly")
    public void the_user_clicks_on_all_navbar_elements_and_verifies_that_the_pages_open_smoothly() {
         PAGES.getHomePage().checkNavBarElements();
    }

    @Then("User clicks on search icon")
    public void user_clicks_on_search_icon() {
        PAGES.getHomePage().clickSearchIcon();
    }

    @When("User types {string} in the search bar")
    public void user_types_in_the_search_bar(String searchContent) {
        PAGES.getHomePage().enterTextAndSearch(searchContent);
    }


}
