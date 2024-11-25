package stepDefinitions;

import io.cucumber.java.en.*;

public class NewsPage extends BaseStep {

    @When("User clicks on the news of {int}")
    public void user_clicks_on_the_news_of(int number) {
        PAGES.getNewspage().selectSearchResultNews(number);
    }

    @Then("User confirms that the correct news is opened")
    public void user_confirms_that_the_correct_news_is_opened() {
        PAGES.getNewspage().verifyNewsHeader();
    }
}
