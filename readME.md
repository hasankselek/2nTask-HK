#  2NTECH UI VE PERFORMANS TESTI PROJESI

---

Bu proje, 2NHaber ve 2NTECH icin baslica UI ve Performans testleri icin hazırlanmıştır.
Kodlama yapilirken  DRY/ SOLID ve OOP yapilarina dikkat edilmistir. Testler Fonksiyonel ve Kara Kutu test metotlarına uygun olarak yapılmistir.


##  🚀 Kullanılan Teknolojiler

- **Java 17**: Projenin ana programlama dili.
- **Maven**: Proje yönetimi ve bağımlılık yönetimi için kullanıldı.
- **Cucumber**: BDD (Behavior-Driven Development) çerçevesi ile test senaryolarını yazmak için kullanıldı.
- **TestNG**: Testlerin yürütülmesi ve raporlanması için kullanıldı.
- **JMeter**: Performans testlerinin yürütülmesi ve raporlanması için kullanıldı.
- **BlazeMeter**: Chrome uzerinden test senaryosu kaydetmek icin kullanildi
- **Allure-Reports**: Çalıştırılan testleri raporlamak için kullanıldı.


## 💻 Proje Yapısı

- **`src/main/java/pages/BasePage.java`**: BasePage abstract classıdir ve kod tekrarını azaltır.
- **`src/main/java/pages`**:Her page icin ayri locate ve methodlari barindirir
- **`src/test/java/stepDefinitions/hooks/Hooks.java`**: After methodlarini barindirir
- **`src/test/java/stepDefinitions/BaseStep.java`**: BaseStep abstract classıdir ve kod tekrarını azaltır.
- **`src/test/java/stepdefinitions`**: UI testlerinin steplerini bulundurur.
- **`src/main/java/utilities`**: UI testleri için yazılmış yardımcı methodları bulundurur.
- **`src/test/resources/features`**: UI test senaryolarını barındırır.
- **`src/test/resources/testData`**: Testler için gerekli olan dosyalari bulundurur (pdf,word,excell vs.)
- **`pom.xml`**: Projede kullanılan tüm bağımlılıkları yöneten Maven yapılandırma dosyası.

## 📊 <span style="color:green;font-family:Courier New">Raporlama</span>

- **Allure Report:** Test sonuçları, Allure tarafından oluşturulan raporlarla belgelenir , her test sonrasi gecici
  olarak allure-results klasoru olusurken , kalici raporlar icin allure-report klasoru olusturulabilir .  
  allure-results olusturmak icin : `allure serve allure-results`   
  allure-report  olusturmak icin : `allure generate allure-results -o allure-report`  



## 🛠️ <span style="color:purple;font-family:Courier New">Kurulum ve Calistirma</span>

1. **Bağımlılıkları Yükleme**:
    - Maven aracılığıyla projenin bağımlılıklarını indirmek için `mvn clean install` komutunu çalıştırın.

2. **Testleri Çalıştırma**:
    - `src/test/java` altındaki test senaryolarını çalıştırmak için `mvn test` komutunu kullanın.


##  👥 <span style="color:orange;font-family:Courier New">Kullanım Senaryoları</span>

- **UI Test Senaryolari**: 2NHaber anasayfa navbar , haber arama fonksiyonu olmak uzere 2 , 2NTech basvuru formu doldurma olmak uzere 1 ,  toplamda 3 farkli senaryo test edilmistir
- **Performans Test Senaryoları**: JMeter'de 25x3 thread, toplamda 75 thread kullanılarak yapılan bir yük testi senaryosu olusturulmustur. Bu, 75 farklı sanal kullanıcıyı simüle ederek navbar elementlerine tıklama ve search ederek haber arama, haber içeriğini kontrol etme testleri yapılmıştır.
## 📝 <span style="color:pink;font-family:Courier New">Notlar</span>

- Bu framework sadece UI otomasyon ve Jmeter performans testlerini barindirir
- Ayrica manuel olarak test edilen senaryolar icin Manuel Test Dokumu exceli hazirlanmisitir
- Manuel test dosyalarına ManuelTestFile dosyasının içinden ulaşabilirsiniz
- Performans testleri ve raporları Jmeter klasörünün altında yer almaktadır.