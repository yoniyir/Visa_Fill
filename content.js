chrome.runtime.sendMessage({
  type: "setState",
  active: localStorage.getItem("convert"),
});
let data = '';
chrome.runtime.onMessage.addListener(function (request) {
  switch (request.type) {
    case "Activate":
      data = request;
      fill(document.URL);

      break;
  }
  return true; // Ensures it is async
});



function fill(url) {


  // STEP 1:
  if (url == 'https://ceac.state.gov/GenNIV/General/complete/complete_personal.aspx?node=Personal1') {
    step1();
  }

  // STEP 2:
  if (url == 'https://ceac.state.gov/GenNIV/General/complete/complete_personalcont.aspx?node=Personal2') {

    step2();
  }

  // STEP 3:
  if (url == 'https://ceac.state.gov/GenNIV/General/complete/complete_travel.aspx?node=Travel') {
    step3();
  }

  // STEP 4:
  if (url == 'https://ceac.state.gov/GenNIV/General/complete/complete_travelcompanions.aspx?node=TravelCompanions') {
    step4();
  }

  // STEP 5:
  if (url == 'https://ceac.state.gov/GenNIV/General/complete/complete_previousustravel.aspx?node=PreviousUSTravel') {
    step5();
  }

  // STEP 6:
  if (url == 'https://ceac.state.gov/GenNIV/General/complete/complete_contact.aspx?node=AddressPhone') {
    step6();
  }

  // STEP 7:
  if (url == 'https://ceac.state.gov/GenNIV/General/complete/Passport_Visa_Info.aspx?node=PptVisa') {
    step7();
  }
  // STEP 8:
  if (url == 'https://ceac.state.gov/GenNIV/General/complete/complete_uscontact.aspx?node=USContact') {
    step8();
  }

  // STEP 9:
  if (url == 'https://ceac.state.gov/GenNIV/General/complete/complete_family1.aspx?node=Relatives') {
    step9();
  }

}


function step1() {
  surname_input = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_SURNAME');
  surname_input.setAttribute('value', data.surname);
  surname_input.dispatchEvent(new Event('change'));


  givenname_input = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_GIVEN_NAME');
  givenname_input.setAttribute('value', data.firstname);
  givenname_input.dispatchEvent(new Event('change'));

  fullname_input = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_FULL_NAME_NATIVE');
  fullname_input.setAttribute('value', data.fullname);
  fullname_input.dispatchEvent(new Event('change'));

  no_other_name = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_rblOtherNames_1');
  no_other_name.checked = true;
  no_other_name.click();

  telecode = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_rblTelecodeQuestion_1');
  telecode.checked = true;
  telecode.click();
  let gender;
  switch (data.gender) {
    case "male":
      gender = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_rblAPP_GENDER_0');
      gender.checked = true;
      break;
    case "female":
      gender = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_rblAPP_GENDER_1');
      gender.checked = true;
      break;
    default:
      console.error("Unrecognised message: ", message);
  }
  gender.click();

  status_input = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlAPP_MARITAL_STATUS');

  switch (data.status) {
    case "single":
      status_input.value = 'S';
      break;
    case "married":
      status_input.value = 'M';
      break;
    case "widowed":
      status_input.value = 'W';
      break;
    case "divorced":
      status_input.value = 'D';
      break;
    default:
      console.error("Unrecognised message: ", message);
  }
  status_input.dispatchEvent(new Event('change'));

  day = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlDOBDay');
  day.value = data.dob_d;
  day.dispatchEvent(new Event('change'));
  month = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlDOBMonth');
  month.value = data.dob_m;
  month.dispatchEvent(new Event('change'));
  year = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxDOBYear');
  year.setAttribute('value', data.dob_y);
  year.dispatchEvent(new Event('change'));

  city = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_POB_CITY');
  city.setAttribute('value', data.birth_city);
  city.dispatchEvent(new Event('change'));
  state_province = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_cbexAPP_POB_ST_PROVINCE_NA');
  state_province.click();
  state_province.checked = true;
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_POB_ST_PROVINCE').setAttribute('disabled', 'true');
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_POB_ST_PROVINCE_NA').setAttribute('value', 'Y');

  birth_country = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlAPP_POB_CNTRY');
  country_list = Array.from(birth_country.children);
  country_list.find((e) => e.value == 'ISRL').selected = 'selected';
  birth_country.dispatchEvent(new Event('change'));

}

function step2() {


  nationality = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlAPP_NATL');
  country_list = Array.from(nationality.children);
  country_list.find((e) => e.value == 'ISRL').selected = 'selected';
  nationality.dispatchEvent(new Event('change'));
  let other_nat;
  if (data.other_nationality != 'no') {
    other_nat = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_rblAPP_OTH_NATL_IND_0');
    other_nat.checked = true;
    other_nat.click();
    setTimeout(function () {
      country_list = Array.from(document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_dtlOTHER_NATL_ctl00_ddlOTHER_NATL').children);
      country_list.find((e) => e.innerText == data.other_nationality).selected = 'selected';
      document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_dtlOTHER_NATL_ctl00_ddlOTHER_NATL').dispatchEvent(new Event('change'));
      document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_dtlOTHER_NATL_ctl00_rblOTHER_PPT_IND_1').checked = true;
      document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_dtlOTHER_NATL_ctl00_rblOTHER_PPT_IND_1').click();
    }, 1000)


  }
  else {
    other_nat = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_rblAPP_OTH_NATL_IND_1');
    other_nat.checked = true;
    other_nat.click();
  }

  id_num = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_NATIONAL_ID');
  id_num.setAttribute('value', data.id);
  id_num.dispatchEvent(new Event('change'));

  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_rblPermResOtherCntryInd_1').checked = true;
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_rblPermResOtherCntryInd_1').click();

  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_cbexAPP_SSN_NA').click();
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_cbexAPP_SSN_NA').checked = true;
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_SSN3').setAttribute('disabled', 'true');


  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_cbexAPP_TAX_ID_NA').click();
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_cbexAPP_TAX_ID_NA').checked = true;
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_TAX_ID').setAttribute('disabled', 'true');




}

function step3() {

  t = Array.from(document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_dlPrincipalAppTravel_ctl00_ddlPurposeOfTrip').children);
  t.find((e) => e.value == 'B').setAttribute('selected', 'selected');
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_dlPrincipalAppTravel_ctl00_ddlPurposeOfTrip').setAttribute('value', 'B');
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_dlPrincipalAppTravel_ctl00_ddlPurposeOfTrip').dispatchEvent(new Event('change'));

  setTimeout(function () {
    t = Array.from(document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_dlPrincipalAppTravel_ctl00_ddlOtherPurpose').children);
    t.find((e) => e.value == 'B1-B2').selected = 'selected';
    document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_dlPrincipalAppTravel_ctl00_ddlOtherPurpose').dispatchEvent(new Event('change'));


    document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_rblSpecificTravel_1').checked = true;
    document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_rblSpecificTravel_1').click();

    setTimeout(function () {


      day = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlTRAVEL_DTEDay');
      day.value = "1";
      day.dispatchEvent(new Event('change'));
      month = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlTRAVEL_DTEMonth');
      month.value = "9";
      month.dispatchEvent(new Event('change'));

      year = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxTRAVEL_DTEYear');
      year.setAttribute('value', '2022');
      year.dispatchEvent(new Event('change'));

      document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlTRAVEL_LOS_CD').children[3].selected = 'selected';
      document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlTRAVEL_LOS_CD').dispatchEvent(new Event('change'));

      document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxTRAVEL_LOS').setAttribute('value', '2');
      setTimeout(function () {
        street = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxStreetAddress1');
        street.setAttribute('value', data.street_usa);
        city = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxCity');
        city.setAttribute('value', data.city_usa);
        state = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlTravelState');
        zip = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbZIPCode');
        zip.setAttribute('value', data.zip_usa);
        zip.dispatchEvent(new Event('change'));

        Array.from(state.children).find((e) => e.innerText == data.state_usa).selected = 'selected';
        document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlWhoIsPaying').children[1].selected = 'selected';
        document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlWhoIsPaying').dispatchEvent(new Event('change'));
      }, 2000)


    }, 2000);

  }, 2000);

}


function resolveAfter2Seconds(i) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
      if (i != parseInt(data.other_companion) - 1) {
        document.getElementById(`ctl00_SiteContentPlaceHolder_FormView1_dlTravelCompanions_ctl0${i}_InsertButtonPrincipalPOT`).click();

      }
    }, 2000 * (i + 1));
  });
}

async function asyncCall(i) {
  console.log('calling');
  const result = await resolveAfter2Seconds(i);

  document.getElementById(`ctl00_SiteContentPlaceHolder_FormView1_dlTravelCompanions_ctl0${i}_tbxSurname`).setAttribute('value', data[`c_surname${i}`]);
  document.getElementById(`ctl00_SiteContentPlaceHolder_FormView1_dlTravelCompanions_ctl0${i}_tbxSurname`).dispatchEvent(new Event('change'));
  document.getElementById(`ctl00_SiteContentPlaceHolder_FormView1_dlTravelCompanions_ctl0${i}_tbxGivenName`).setAttribute('value', data[`c_firstname${i}`]);
  document.getElementById(`ctl00_SiteContentPlaceHolder_FormView1_dlTravelCompanions_ctl0${i}_tbxGivenName`).dispatchEvent(new Event('change'));
  t = Array.from(document.getElementById(`ctl00_SiteContentPlaceHolder_FormView1_dlTravelCompanions_ctl0${i}_ddlTCRelationship`).children);
  t.find((e) => e.innerText == data[`c_relationship${i}`]).selected = 'selected';
  document.getElementById(`ctl00_SiteContentPlaceHolder_FormView1_dlTravelCompanions_ctl0${i}_ddlTCRelationship`).dispatchEvent(new Event('change'));
}

function step4() {
  if (data.other_companion != 'no') {
    comapnion = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_rblOtherPersonsTravelingWithYou_0');
    comapnion.click();
    comapnion.checked = true;
    setTimeout(function () {
      document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_rblGroupTravel_1').click();
      document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_rblGroupTravel_1').checked = true;
      for (let i = 0; i < parseInt(data.other_companion); i++) {
        asyncCall(i);
      }
    }, 1500)


  }
  else {
    comapnion = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_rblOtherPersonsTravelingWithYou_1');
    comapnion.checked = true;
    comapnion.click();
  }
}

function step5() {
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_rblPREV_US_TRAVEL_IND_1').click();
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_rblPREV_US_TRAVEL_IND_1').checked = true;

  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_rblPREV_VISA_IND_1').click();
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_rblPREV_VISA_IND_1').checked = true;

  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_rblPREV_VISA_REFUSED_IND_1').click();
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_rblPREV_VISA_REFUSED_IND_1').checked = true;

  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_rblIV_PETITION_IND_1').click();
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_rblIV_PETITION_IND_1').checked = true;

}

function step6() {
  state = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlCountry');
  Array.from(state.children).find((e) => e.value == 'ISRL').selected = 'selected';
  state.dispatchEvent(new Event('change'));
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_cbexAPP_ADDR_STATE_NA').click();

  address = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_ADDR_LN1');
  city = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_ADDR_CITY');
  zip = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_ADDR_POSTAL_CD');
  address.setAttribute('value', data.home_address);
  address.dispatchEvent(new Event('change'));
  city.setAttribute('value', data.home_city);
  city.dispatchEvent(new Event('change'));
  zip.setAttribute('value', data.home_zip);
  zip.dispatchEvent(new Event('change'));
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_rblMailingAddrSame_0').click();
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_cbexAPP_MOBILE_TEL_NA').click();
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_cbexAPP_BUS_TEL_NA').click();

  phone = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_HOME_TEL');
  phone.setAttribute('value', data.phone_number);
  phone.dispatchEvent(new Event('change'));
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_rblAddPhone_1').click();

  mail = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_EMAIL_ADDR');
  mail.setAttribute('value', data.mail);
  mail.dispatchEvent(new Event('change'));

  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_rblAddEmail_1').click();

  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_dtlSocial_ctl00_ddlSocialMedia').children[3].selected = 'selected';
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_dtlSocial_ctl00_ddlSocialMedia').dispatchEvent(new Event('change'));


  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_dtlSocial_ctl00_tbxSocialMediaIdent').setAttribute('value', data.social_name);
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_dtlSocial_ctl00_tbxSocialMediaIdent').dispatchEvent(new Event('change'));

  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_rblAddSocial_1').click();

}

function step7() {

  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_TYPE').children[1].selected = 'selected';
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_TYPE').dispatchEvent(new Event('change'));


  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxPPT_NUM').setAttribute('value', data.passport_number);
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxPPT_NUM').dispatchEvent(new Event('change'));


  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_cbexPPT_BOOK_NUM_NA').click();

  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxPPT_ISSUED_IN_CITY').setAttribute('value', data.passport_city);
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxPPT_ISSUED_IN_CITY').dispatchEvent(new Event('change'));

  Array.from(document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_ISSUED_DTEDay').children).find((e) => e.value === data.passport_i_day).selected = 'selected';
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_ISSUED_DTEDay').dispatchEvent(new Event('change'));
  Array.from(document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_ISSUED_DTEMonth').children).find((e) => e.value === data.passport_i_month).selected = 'selected';
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_ISSUED_DTEMonth').dispatchEvent(new Event('change'));

  Array.from(document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_EXPIRE_DTEDay').children).find((e) => e.value === data.passport_e_day).selected = 'selected';
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_EXPIRE_DTEDay').dispatchEvent(new Event('change'));
  Array.from(document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_EXPIRE_DTEMonth').children).find((e) => e.value === data.passport_e_month).selected = 'selected';
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_EXPIRE_DTEMonth').dispatchEvent(new Event('change'));
  setTimeout(function () {
    document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxPPT_ISSUEDYear').setAttribute('value', data.passport_i_year);
    document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxPPT_ISSUEDYear').dispatchEvent(new Event('change'));
    document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxPPT_EXPIREYear').setAttribute('value', data.passport_e_year);
    document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxPPT_EXPIREYear').dispatchEvent(new Event('change'));
    setTimeout(function () {

      document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_rblLOST_PPT_IND_1').click();

    }, 1000)
  }, 1000)


}

function step8() {
  Array.from(document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlUS_POC_REL_TO_APP').children).find((e) => e.value == 'O').selected = 'selected';
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlUS_POC_REL_TO_APP').dispatchEvent(new Event('change'));
  surname = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_SURNAME');
  firstname = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_GIVEN_NAME');
  org_name = document.getElementsByName('ctl00$SiteContentPlaceHolder$FormView1$tbxUS_POC_ORGANIZATION')[0];
  surname.setAttribute('value', 'whatever');
  firstname.setAttribute('value', 'whatever two');
  org_name.setAttribute('value', 'ISRAEL EMBASSY IN NEW YORK');
  surname.dispatchEvent(new Event('change'));
  firstname.dispatchEvent(new Event('change'));
  org_name.dispatchEvent(new Event('change'));
  setTimeout(function () {

    document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_ADDR_LN1').setAttribute('value', 'HILTON HOTEL 1335 AVENUE');
    document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_ADDR_LN1').dispatchEvent(new Event('change'));

    document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_ADDR_CITY').setAttribute('value', 'NEW YORK');
    document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_ADDR_CITY').dispatchEvent(new Event('change'));

    Array.from(document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlUS_POC_ADDR_STATE').children).find((e) => e.value == 'NY').selected = 'selected';
    document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlUS_POC_ADDR_STATE').dispatchEvent(new Event('change'));

    document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_ADDR_POSTAL_CD').setAttribute('value', '10019');
    document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_ADDR_POSTAL_CD').dispatchEvent(new Event('change'));

    document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_HOME_TEL').setAttribute('value', '123456789');
    document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_HOME_TEL').dispatchEvent(new Event('change'));

    document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_cbexUS_POC_EMAIL_ADDR_NA').click();
  }, 1000);

}


function step9() {

  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxFATHER_SURNAME').setAttribute('value', 'father surname');
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxFATHER_SURNAME').dispatchEvent(new Event('change'));

  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxFATHER_GIVEN_NAME').setAttribute('value', 'father name');
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxFATHER_GIVEN_NAME').dispatchEvent(new Event('change'));

  day = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlFathersDOBDay');
  day.value = "01";
  day.dispatchEvent(new Event('change'));
  month = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlFathersDOBMonth');
  month.value = "JAN";
  month.dispatchEvent(new Event('change'));

  year = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxFathersDOBYear');
  year.setAttribute('value', '2022');
  year.dispatchEvent(new Event('change'));




  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxMOTHER_SURNAME').setAttribute('value', 'father surname');
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxMOTHER_SURNAME').dispatchEvent(new Event('change'));

  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxMOTHER_GIVEN_NAME').setAttribute('value', 'father name');
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxMOTHER_GIVEN_NAME').dispatchEvent(new Event('change'));

  day = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlMothersDOBDay');
  day.value = "01";
  day.dispatchEvent(new Event('change'));
  month = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_ddlMothersDOBMonth');
  month.value = "JAN";
  month.dispatchEvent(new Event('change'));

  year = document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_tbxMothersDOBYear');
  year.setAttribute('value', '2022');
  year.dispatchEvent(new Event('change'));
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_rblFATHER_LIVE_IN_US_IND_1').click();
  document.getElementById('ctl00_SiteContentPlaceHolder_FormView1_rblMOTHERLIVE_IN_US_IND_1').click();



}

function step10() {

}
