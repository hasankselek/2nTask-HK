Feature: Arama İşlevselliği

  Ziyaretçi 2NHABER web sitesinde arama butonunu kullanarak istediği haberi arayabilmeli ve
  sonuçlardan belirli bir haberin detayına gidebilmelidir.

  @2n
  Scenario: Haber arama ve detay sayfasına gitme

    Given User opens "2nhaberUrl"
    Then Verifies access to "2nhaberUrl" page
    And User clicks on search icon
    When User types "İstanbul" in the search bar
    And User clicks on the news of 8
    Then User confirms that the correct news is opened
