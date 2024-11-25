Feature: NavBar İşlevselliği

  Ziyaretçi 2NHABER web sitesindeki tüm navbar elementlerine tıklayabilmeli
  ve ilgili sayfaların sorunsuz bir şekilde açıldığını doğrulayabilmelidir.

  @2n
  Scenario:Navbar'daki tüm elementlere tıklama ve sayfaların doğrulanması

    Given User opens "2nhaberUrl"
    Then Verifies access to "2nhaberUrl" page
    Then The user clicks on all navbar elements and verifies that the pages open smoothly