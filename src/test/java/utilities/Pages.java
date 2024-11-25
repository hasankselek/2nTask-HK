package utilities;

import pages.CommonPage;
import pages.HomePage;
import pages.HrPage;
import pages.NewsPage;

public class Pages {

    private CommonPage commonPage;
    private HomePage homePage;
    private NewsPage newspage;
    private HrPage hrPage;


    public Pages() {
        this.commonPage = new CommonPage();
        this.homePage = new HomePage();
        this.newspage = new NewsPage();
        this.hrPage = new HrPage();

    }

    public CommonPage getCommonPage() {
        return commonPage;
    }

    public HomePage getHomePage() {
        return homePage;
    }

    public NewsPage getNewspage() {
        return newspage;
    }

    public HrPage getHrPage() {
        return hrPage;
    }
}
