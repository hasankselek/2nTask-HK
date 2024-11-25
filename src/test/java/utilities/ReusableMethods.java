package utilities;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.*;
import org.openqa.selenium.interactions.Actions;

import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.util.Date;


public class ReusableMethods {


    private static Actions actions = new Actions(Driver.getDriver());

    /**
     * Takes a screenshot and returns the file path
     *
     * @param name the name of the screenshot file
     * @return the file path of the screenshot
     */
    public static String takeScreenshot(String name) throws IOException {
        String date = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
        TakesScreenshot ts = (TakesScreenshot) Driver.getDriver();
        File source = ts.getScreenshotAs(OutputType.FILE);
        String target = System.getProperty("user.dir") + "/test-output/Screenshots/" + name + "_" + date + ".png";
        File finalDestination = new File(target);
        FileUtils.copyFile(source, finalDestination);
        return target;
    }

    /**
     * Hovers over a web element
     *
     * @param element the WebElement to hover over
     */
    public static void hoverOver(WebElement element) {

        actions.moveToElement(element).perform();
    }


    /**
     * Uploads a file by sending the file path to an input element
     *
     * @param filePath      the full file path to upload
     * @param uploadElement the input WebElement (usually input[type='file'])
     */
    public static void uploadFile(String filePath, WebElement uploadElement) {

        uploadElement.sendKeys(filePath); // Directly sends the file path to the input
        // element
    }


    /**
     * Waits for the page to load completely
     *
     * @param timeout in seconds
     */
    public static void waitForPageToLoad(long timeout) {
        WebDriverWait wait = new WebDriverWait(Driver.getDriver(), Duration.ofSeconds(timeout));
        wait.until(webDriver -> ((JavascriptExecutor) webDriver).executeScript("return document.readyState")
                .equals("complete"));
    }


    /**
     * Simple hard wait method using Thread.sleep
     *
     * @param seconds the number of seconds to wait
     */
    public static void hardWait(int seconds) {
        try {
            Thread.sleep(seconds * 1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    // A function that scrolls the page up to the specified element.
    public static void scrollToElement(WebDriver driver, WebElement element) {
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].scrollIntoView({block: 'center', behavior: 'instant'});", element);
    }


}



