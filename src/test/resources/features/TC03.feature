Feature: Form Gönderimi

  Ziyaretçi 2NTECH web sitesindeki formu eksiksiz doldurup başarılı bir şekilde gönderebilmelidir.

  @2n
  Scenario: Formun doldurulması ve gönderilmesi

    Given User opens "2nTechUrl"
    Then Verifies access to "2nTechUrl" page
    And User fills in required information and upload CV
      | Field           | Value                      |
      | AdSoyad         | Hasan Kucukselek           |
      | DogumTarihi     | 02.09.1996                 |
      | TCKimlik        | 11111111111                |
      | CepTelefonu     | 05555555555                |
      | MailAdresi      | hasankucukselek7@gmail.com |
      | EgitimBilgileri | Lisans                     |
    And Click next arrow
    And User selects the desired job position "Test Engineer"
    And User clicks Gönder button
    Then User verifies that success message is displayed




