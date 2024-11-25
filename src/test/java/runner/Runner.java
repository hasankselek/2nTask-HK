package runner;

import io.cucumber.testng.AbstractTestNGCucumberTests;
import io.cucumber.testng.CucumberOptions;
import org.testng.annotations.DataProvider;

@CucumberOptions(
        features = {"src/test/resources/features/TC01.feature",
                    "src/test/resources/features/TC02.feature",
                    "src/test/resources/features/TC03.feature"
        },
        glue = { "stepDefinitions" },
        plugin = { "pretty","io.qameta.allure.cucumber7jvm.AllureCucumber7Jvm"},
        tags = "@2n",
        dryRun = false,
        publish = false
)

public class Runner extends AbstractTestNGCucumberTests {

    @Override
    @DataProvider(parallel = false) // Paralel test çalıştırmayı etkinleştirir
    public Object[][] scenarios() {
        return super.scenarios();
    }
}
