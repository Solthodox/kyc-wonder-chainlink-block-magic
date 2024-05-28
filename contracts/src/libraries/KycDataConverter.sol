// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

enum Country {
    NULL,
    AFGHANISTAN,
    ALGERIA,
    ALBANIA,
    ANDORRA,
    ANGOLA,
    ANTIGUA_AND_BARBUDA,
    ARGENTINA,
    ARMENIA,
    AUSTRALIA,
    AUSTRIA,
    AZERBAIJAN,
    BAHAMAS,
    BAHRAIN,
    BANGLADESH,
    BARBADOS,
    BELARUS,
    BELGIUM,
    BELIZE,
    BENIN,
    BHUTAN,
    BOLIVIA,
    BOSNIA_AND_HERZEGOVINA,
    BOTSWANA,
    BRAZIL,
    BRUNEI,
    BULGARIA,
    BURKINA_FASO,
    BURUNDI,
    CABO_VERDE,
    CAMBODIA,
    CAMEROON,
    CANADA,
    CENTRAL_AFRICAN_REPUBLIC,
    CHAD,
    CHILE,
    CHINA,
    COLOMBIA,
    COMOROS,
    CONGO_DEMOCRATIC_REPUBLIC_OF_THE,
    CONGO_REPUBLIC_OF_THE,
    COSTA_RICA,
    CROATIA,
    CUBA,
    CYPRUS,
    CZECH_REPUBLIC,
    DENMARK,
    DJIBOUTI,
    DOMINICA,
    DOMINICAN_REPUBLIC,
    EAST_TIMOR_TIMOR_LESTE,
    ECUADOR,
    EGYPT,
    EL_SALVADOR,
    EQUATORIAL_GUINEA,
    ERITREA,
    ESTONIA,
    ESWATINI,
    ETHIOPIA,
    FIJI,
    FINLAND,
    FRANCE,
    GABON,
    GAMBIA,
    GEORGIA,
    GERMANY,
    GHANA,
    GREECE,
    GRENADA,
    GUATEMALA,
    GUINEA,
    GUINEA_BISSAU,
    GUYANA,
    HAITI,
    HONDURAS,
    HUNGARY,
    ICELAND,
    INDIA,
    INDONESIA,
    IRAN,
    IRAQ,
    IRELAND,
    ISRAEL,
    ITALY,
    IVORY_COAST,
    JAMAICA,
    JAPAN,
    JORDAN,
    KAZAKHSTAN,
    KENYA,
    KIRIBATI,
    KOREA_NORTH,
    KOREA_SOUTH,
    KOSOVO,
    KUWAIT,
    KYRGYZSTAN,
    LAOS,
    LATVIA,
    LEBANON,
    LESOTHO,
    LIBERIA,
    LIBYA,
    LIECHTENSTEIN,
    LITHUANIA,
    LUXEMBOURG,
    MADAGASCAR,
    MALAWI,
    MALAYSIA,
    MALDIVES,
    MALI,
    MALTA,
    MARSHALL_ISLANDS,
    MAURITANIA,
    MAURITIUS,
    MEXICO,
    MICRONESIA,
    MOLDOVA,
    MONACO,
    MONGOLIA,
    MONTENEGRO,
    MOROCCO,
    MOZAMBIQUE,
    MYANMAR_BURMA,
    NAMIBIA,
    NAURU,
    NEPAL,
    NETHERLANDS,
    NEW_ZEALAND,
    NICARAGUA,
    NIGER,
    NIGERIA,
    NORTH_MACEDONIA,
    NORWAY,
    OMAN,
    PAKISTAN,
    PALAU,
    PALESTINE,
    PANAMA,
    PAPUA_NEW_GUINEA,
    PARAGUAY,
    PERU,
    PHILIPPINES,
    POLAND,
    PORTUGAL,
    QATAR,
    ROMANIA,
    RUSSIA,
    RWANDA,
    SAINT_KITTS_AND_NEVIS,
    SAINT_LUCIA,
    SAINT_VINCENT_AND_THE_GRENADINES,
    SAMOA,
    SAN_MARINO,
    SAO_TOME_AND_PRINCIPE,
    SAUDI_ARABIA,
    SENEGAL,
    SERBIA,
    SEYCHELLES,
    SIERRA_LEONE,
    SINGAPORE,
    SLOVAKIA,
    SLOVENIA,
    SOLOMON_ISLANDS,
    SOMALIA,
    SOUTH_AFRICA,
    SOUTH_SUDAN,
    SPAIN,
    SRI_LANKA,
    SUDAN,
    SURINAME,
    SWEDEN,
    SWITZERLAND,
    SYRIA,
    TAIWAN,
    TAJIKISTAN,
    TANZANIA,
    THAILAND,
    TOGO,
    TONGA,
    TRINIDAD_AND_TOBAGO,
    TUNISIA,
    TURKEY,
    TURKMENISTAN,
    TUVALU,
    UGANDA,
    UKRAINE,
    UNITED_ARAB_EMIRATES,
    UNITED_KINGDOM,
    UNITED_STATES,
    URUGUAY,
    UZBEKISTAN,
    VANUATU,
    VATICAN_CITY,
    VENEZUELA,
    VIETNAM,
    YEMEN,
    ZAMBIA,
    ZIMBABWE
}

enum CreditScore {
    NULL,
    POOR,
    STANDARD,
    GOOD
}

enum Provider {
    NULL,
    ARGON
}

library KycDataConverter {
    function getCountryCode(Country _country) internal pure returns (uint256) {
        if (_country == Country.AFGHANISTAN) return 4;
        if (_country == Country.ALGERIA) return 12;
        if (_country == Country.ALBANIA) return 8;
        if (_country == Country.ANDORRA) return 20;
        if (_country == Country.ANGOLA) return 24;
        if (_country == Country.ANTIGUA_AND_BARBUDA) return 28;
        if (_country == Country.ARGENTINA) return 32;
        if (_country == Country.ARMENIA) return 51;
        if (_country == Country.AUSTRALIA) return 36;
        if (_country == Country.AUSTRIA) return 40;
        if (_country == Country.AZERBAIJAN) return 31;
        if (_country == Country.BAHAMAS) return 44;
        if (_country == Country.BAHRAIN) return 48;
        if (_country == Country.BANGLADESH) return 50;
        if (_country == Country.BARBADOS) return 52;
        if (_country == Country.BELARUS) return 112;
        if (_country == Country.BELGIUM) return 56;
        if (_country == Country.BELIZE) return 84;
        if (_country == Country.BENIN) return 204;
        if (_country == Country.BHUTAN) return 64;
        if (_country == Country.BOLIVIA) return 68;
        if (_country == Country.BOSNIA_AND_HERZEGOVINA) return 70;
        if (_country == Country.BOTSWANA) return 72;
        if (_country == Country.BRAZIL) return 76;
        if (_country == Country.BRUNEI) return 96;
        if (_country == Country.BULGARIA) return 100;
        if (_country == Country.BURKINA_FASO) return 854;
        if (_country == Country.BURUNDI) return 108;
        if (_country == Country.CABO_VERDE) return 132;
        if (_country == Country.CAMBODIA) return 116;
        if (_country == Country.CAMEROON) return 120;
        if (_country == Country.CANADA) return 124;
        if (_country == Country.CENTRAL_AFRICAN_REPUBLIC) return 140;
        if (_country == Country.CHAD) return 148;
        if (_country == Country.CHILE) return 152;
        if (_country == Country.CHINA) return 156;
        if (_country == Country.COLOMBIA) return 170;
        if (_country == Country.COMOROS) return 174;
        if (_country == Country.CONGO_DEMOCRATIC_REPUBLIC_OF_THE) return 180;
        if (_country == Country.CONGO_REPUBLIC_OF_THE) return 178;
        if (_country == Country.COSTA_RICA) return 188;
        if (_country == Country.CROATIA) return 191;
        if (_country == Country.CUBA) return 192;
        if (_country == Country.CYPRUS) return 196;
        if (_country == Country.CZECH_REPUBLIC) return 203;
        if (_country == Country.DENMARK) return 208;
        if (_country == Country.DJIBOUTI) return 262;
        if (_country == Country.DOMINICA) return 212;
        if (_country == Country.DOMINICAN_REPUBLIC) return 214;
        if (_country == Country.EAST_TIMOR_TIMOR_LESTE) return 626;
        if (_country == Country.ECUADOR) return 218;
        if (_country == Country.EGYPT) return 818;
        if (_country == Country.EL_SALVADOR) return 222;
        if (_country == Country.EQUATORIAL_GUINEA) return 226;
        if (_country == Country.ERITREA) return 232;
        if (_country == Country.ESTONIA) return 233;
        if (_country == Country.ESWATINI) return 748;
        if (_country == Country.ETHIOPIA) return 231;
        if (_country == Country.FIJI) return 242;
        if (_country == Country.FINLAND) return 246;
        if (_country == Country.FRANCE) return 250;
        if (_country == Country.GABON) return 266;
        if (_country == Country.GAMBIA) return 270;
        if (_country == Country.GEORGIA) return 268;
        if (_country == Country.GERMANY) return 276;
        if (_country == Country.GHANA) return 288;
        if (_country == Country.GREECE) return 300;
        if (_country == Country.GRENADA) return 308;
        if (_country == Country.GUATEMALA) return 320;
        if (_country == Country.GUINEA) return 324;
        if (_country == Country.GUINEA_BISSAU) return 624;
        if (_country == Country.GUYANA) return 328;
        if (_country == Country.HAITI) return 332;
        if (_country == Country.HONDURAS) return 340;
        if (_country == Country.HUNGARY) return 348;
        if (_country == Country.ICELAND) return 352;
        if (_country == Country.INDIA) return 356;
        if (_country == Country.INDONESIA) return 360;
        if (_country == Country.IRAN) return 364;
        if (_country == Country.IRAQ) return 368;
        if (_country == Country.IRELAND) return 372;
        if (_country == Country.ISRAEL) return 376;
        if (_country == Country.ITALY) return 380;
        if (_country == Country.IVORY_COAST) return 384;
        if (_country == Country.JAMAICA) return 388;
        if (_country == Country.JAPAN) return 392;
        if (_country == Country.JORDAN) return 400;
        if (_country == Country.KAZAKHSTAN) return 398;
        if (_country == Country.KENYA) return 404;
        if (_country == Country.KIRIBATI) return 296;
        if (_country == Country.KOREA_NORTH) return 408;
        if (_country == Country.KOREA_SOUTH) return 410;
        if (_country == Country.KOSOVO) return 383;
        if (_country == Country.KUWAIT) return 414;
        if (_country == Country.KYRGYZSTAN) return 417;
        if (_country == Country.LAOS) return 418;
        if (_country == Country.LATVIA) return 428;
        if (_country == Country.LEBANON) return 422;
        if (_country == Country.LESOTHO) return 426;
        if (_country == Country.LIBERIA) return 430;
        if (_country == Country.LIBYA) return 434;
        if (_country == Country.LIECHTENSTEIN) return 438;
        if (_country == Country.LITHUANIA) return 440;
        if (_country == Country.LUXEMBOURG) return 442;
        if (_country == Country.MADAGASCAR) return 450;
        if (_country == Country.MALAWI) return 454;
        if (_country == Country.MALAYSIA) return 458;
        if (_country == Country.MALDIVES) return 462;
        if (_country == Country.MALI) return 466;
        if (_country == Country.MALTA) return 470;
        if (_country == Country.MARSHALL_ISLANDS) return 584;
        if (_country == Country.MAURITANIA) return 478;
        if (_country == Country.MAURITIUS) return 480;
        if (_country == Country.MEXICO) return 484;
        if (_country == Country.MICRONESIA) return 583;
        if (_country == Country.MOLDOVA) return 498;
        if (_country == Country.MONACO) return 492;
        if (_country == Country.MONGOLIA) return 496;
        if (_country == Country.MONTENEGRO) return 499;
        if (_country == Country.MOROCCO) return 504;
        if (_country == Country.MOZAMBIQUE) return 508;
        if (_country == Country.MYANMAR_BURMA) return 104;
        if (_country == Country.NAMIBIA) return 516;
        if (_country == Country.NAURU) return 520;
        if (_country == Country.NEPAL) return 524;
        if (_country == Country.NETHERLANDS) return 528;
        if (_country == Country.NEW_ZEALAND) return 554;
        if (_country == Country.NICARAGUA) return 558;
        if (_country == Country.NIGER) return 562;
        if (_country == Country.NIGERIA) return 566;
        if (_country == Country.NORTH_MACEDONIA) return 807;
        if (_country == Country.NORWAY) return 578;
        if (_country == Country.OMAN) return 512;
        if (_country == Country.PAKISTAN) return 586;
        if (_country == Country.PALAU) return 585;
        if (_country == Country.PALESTINE) return 275;
        if (_country == Country.PANAMA) return 591;
        if (_country == Country.PAPUA_NEW_GUINEA) return 598;
        if (_country == Country.PARAGUAY) return 600;
        if (_country == Country.PERU) return 604;
        if (_country == Country.PHILIPPINES) return 608;
        if (_country == Country.POLAND) return 616;
        if (_country == Country.PORTUGAL) return 620;
        if (_country == Country.QATAR) return 634;
        if (_country == Country.ROMANIA) return 642;
        if (_country == Country.RUSSIA) return 643;
        if (_country == Country.RWANDA) return 646;
        if (_country == Country.SAINT_KITTS_AND_NEVIS) return 659;
        if (_country == Country.SAINT_LUCIA) return 662;
        if (_country == Country.SAINT_VINCENT_AND_THE_GRENADINES) return 670;
        if (_country == Country.SAMOA) return 882;
        if (_country == Country.SAN_MARINO) return 674;
        if (_country == Country.SAO_TOME_AND_PRINCIPE) return 678;
        if (_country == Country.SAUDI_ARABIA) return 682;
        if (_country == Country.SENEGAL) return 686;
        if (_country == Country.SERBIA) return 688;
        if (_country == Country.SEYCHELLES) return 690;
        if (_country == Country.SIERRA_LEONE) return 694;
        if (_country == Country.SINGAPORE) return 702;
        if (_country == Country.SLOVAKIA) return 703;
        if (_country == Country.SLOVENIA) return 705;
        if (_country == Country.SOLOMON_ISLANDS) return 90;
        if (_country == Country.SOMALIA) return 706;
        if (_country == Country.SOUTH_AFRICA) return 710;
        if (_country == Country.SOUTH_SUDAN) return 728;
        if (_country == Country.SPAIN) return 724;
        if (_country == Country.SRI_LANKA) return 144;
        if (_country == Country.SUDAN) return 729;
        if (_country == Country.SURINAME) return 740;
        if (_country == Country.SWEDEN) return 752;
        if (_country == Country.SWITZERLAND) return 756;
        if (_country == Country.SYRIA) return 760;
        if (_country == Country.TAIWAN) return 158;
        if (_country == Country.TAJIKISTAN) return 762;
        if (_country == Country.TANZANIA) return 834;
        if (_country == Country.THAILAND) return 764;
        if (_country == Country.TOGO) return 768;
        if (_country == Country.TONGA) return 776;
        if (_country == Country.TRINIDAD_AND_TOBAGO) return 780;
        if (_country == Country.TUNISIA) return 788;
        if (_country == Country.TURKEY) return 792;
        if (_country == Country.TURKMENISTAN) return 795;
        if (_country == Country.TUVALU) return 798;
        if (_country == Country.UGANDA) return 800;
        if (_country == Country.UKRAINE) return 804;
        if (_country == Country.UNITED_ARAB_EMIRATES) return 784;
        if (_country == Country.UNITED_KINGDOM) return 826;
        if (_country == Country.UNITED_STATES) return 840;
        if (_country == Country.URUGUAY) return 858;
        if (_country == Country.UZBEKISTAN) return 860;
        if (_country == Country.VANUATU) return 548;
        if (_country == Country.VATICAN_CITY) return 336;
        if (_country == Country.VENEZUELA) return 862;
        if (_country == Country.VIETNAM) return 704;
        if (_country == Country.YEMEN) return 887;
        if (_country == Country.ZAMBIA) return 894;
        if (_country == Country.ZIMBABWE) return 716;

        return 0; // Return 0 for unknown or NULL country
    }

    function getCreditNumber(CreditScore creditScore) internal pure returns (uint256) {
        return uint256(uint8(creditScore));
    }

    function getProviderNumber(Provider provider) internal pure returns (uint256) {
        return uint256(uint8(provider));
    }

    function getCountry(uint256 _countryCode) internal pure returns (Country country) {
        if (_countryCode == 4) return Country.AFGHANISTAN;
        if (_countryCode == 12) return Country.ALGERIA;
        if (_countryCode == 8) return Country.ALBANIA;
        if (_countryCode == 20) return Country.ANDORRA;
        if (_countryCode == 24) return Country.ANGOLA;
        if (_countryCode == 28) return Country.ANTIGUA_AND_BARBUDA;
        if (_countryCode == 32) return Country.ARGENTINA;
        if (_countryCode == 51) return Country.ARMENIA;
        if (_countryCode == 36) return Country.AUSTRALIA;
        if (_countryCode == 40) return Country.AUSTRIA;
        if (_countryCode == 31) return Country.AZERBAIJAN;
        if (_countryCode == 44) return Country.BAHAMAS;
        if (_countryCode == 48) return Country.BAHRAIN;
        if (_countryCode == 50) return Country.BANGLADESH;
        if (_countryCode == 52) return Country.BARBADOS;
        if (_countryCode == 112) return Country.BELARUS;
        if (_countryCode == 56) return Country.BELGIUM;
        if (_countryCode == 84) return Country.BELIZE;
        if (_countryCode == 204) return Country.BENIN;
        if (_countryCode == 64) return Country.BHUTAN;
        if (_countryCode == 68) return Country.BOLIVIA;
        if (_countryCode == 70) return Country.BOSNIA_AND_HERZEGOVINA;
        if (_countryCode == 72) return Country.BOTSWANA;
        if (_countryCode == 76) return Country.BRAZIL;
        if (_countryCode == 96) return Country.BRUNEI;
        if (_countryCode == 100) return Country.BULGARIA;
        if (_countryCode == 854) return Country.BURKINA_FASO;
        if (_countryCode == 108) return Country.BURUNDI;
        if (_countryCode == 132) return Country.CABO_VERDE;
        if (_countryCode == 116) return Country.CAMBODIA;
        if (_countryCode == 120) return Country.CAMEROON;
        if (_countryCode == 124) return Country.CANADA;
        if (_countryCode == 140) return Country.CENTRAL_AFRICAN_REPUBLIC;
        if (_countryCode == 148) return Country.CHAD;
        if (_countryCode == 152) return Country.CHILE;
        if (_countryCode == 156) return Country.CHINA;
        if (_countryCode == 170) return Country.COLOMBIA;
        if (_countryCode == 174) return Country.COMOROS;
        if (_countryCode == 180) return Country.CONGO_DEMOCRATIC_REPUBLIC_OF_THE;
        if (_countryCode == 178) return Country.CONGO_REPUBLIC_OF_THE;
        if (_countryCode == 188) return Country.COSTA_RICA;
        if (_countryCode == 191) return Country.CROATIA;
        if (_countryCode == 192) return Country.CUBA;
        if (_countryCode == 196) return Country.CYPRUS;
        if (_countryCode == 203) return Country.CZECH_REPUBLIC;
        if (_countryCode == 208) return Country.DENMARK;
        if (_countryCode == 262) return Country.DJIBOUTI;
        if (_countryCode == 212) return Country.DOMINICA;
        if (_countryCode == 214) return Country.DOMINICAN_REPUBLIC;
        if (_countryCode == 626) return Country.EAST_TIMOR_TIMOR_LESTE;
        if (_countryCode == 218) return Country.ECUADOR;
        if (_countryCode == 818) return Country.EGYPT;
        if (_countryCode == 222) return Country.EL_SALVADOR;
        if (_countryCode == 226) return Country.EQUATORIAL_GUINEA;
        if (_countryCode == 232) return Country.ERITREA;
        if (_countryCode == 233) return Country.ESTONIA;
        if (_countryCode == 748) return Country.ESWATINI;
        if (_countryCode == 231) return Country.ETHIOPIA;
        if (_countryCode == 242) return Country.FIJI;
        if (_countryCode == 246) return Country.FINLAND;
        if (_countryCode == 250) return Country.FRANCE;
        if (_countryCode == 266) return Country.GABON;
        if (_countryCode == 270) return Country.GAMBIA;
        if (_countryCode == 268) return Country.GEORGIA;
        if (_countryCode == 276) return Country.GERMANY;
        if (_countryCode == 288) return Country.GHANA;
        if (_countryCode == 300) return Country.GREECE;
        if (_countryCode == 308) return Country.GRENADA;
        if (_countryCode == 320) return Country.GUATEMALA;
        if (_countryCode == 324) return Country.GUINEA;
        if (_countryCode == 624) return Country.GUINEA_BISSAU;
        if (_countryCode == 328) return Country.GUYANA;
        if (_countryCode == 332) return Country.HAITI;
        if (_countryCode == 340) return Country.HONDURAS;
        if (_countryCode == 348) return Country.HUNGARY;
        if (_countryCode == 352) return Country.ICELAND;
        if (_countryCode == 356) return Country.INDIA;
        if (_countryCode == 360) return Country.INDONESIA;
        if (_countryCode == 364) return Country.IRAN;
        if (_countryCode == 368) return Country.IRAQ;
        if (_countryCode == 372) return Country.IRELAND;
        if (_countryCode == 376) return Country.ISRAEL;
        if (_countryCode == 380) return Country.ITALY;
        if (_countryCode == 384) return Country.IVORY_COAST;
        if (_countryCode == 388) return Country.JAMAICA;
        if (_countryCode == 392) return Country.JAPAN;
        if (_countryCode == 400) return Country.JORDAN;
        if (_countryCode == 398) return Country.KAZAKHSTAN;
        if (_countryCode == 404) return Country.KENYA;
        if (_countryCode == 296) return Country.KIRIBATI;
        if (_countryCode == 408) return Country.KOREA_NORTH;
        if (_countryCode == 410) return Country.KOREA_SOUTH;
        if (_countryCode == 383) return Country.KOSOVO;
        if (_countryCode == 414) return Country.KUWAIT;
        if (_countryCode == 417) return Country.KYRGYZSTAN;
        if (_countryCode == 418) return Country.LAOS;
        if (_countryCode == 428) return Country.LATVIA;
        if (_countryCode == 422) return Country.LEBANON;
        if (_countryCode == 426) return Country.LESOTHO;
        if (_countryCode == 430) return Country.LIBERIA;
        if (_countryCode == 434) return Country.LIBYA;
        if (_countryCode == 438) return Country.LIECHTENSTEIN;
        if (_countryCode == 440) return Country.LITHUANIA;
        if (_countryCode == 442) return Country.LUXEMBOURG;
        if (_countryCode == 450) return Country.MADAGASCAR;
        if (_countryCode == 454) return Country.MALAWI;
        if (_countryCode == 458) return Country.MALAYSIA;
        if (_countryCode == 462) return Country.MALDIVES;
        if (_countryCode == 466) return Country.MALI;
        if (_countryCode == 470) return Country.MALTA;
        if (_countryCode == 584) return Country.MARSHALL_ISLANDS;
        if (_countryCode == 478) return Country.MAURITANIA;
        if (_countryCode == 480) return Country.MAURITIUS;
        if (_countryCode == 484) return Country.MEXICO;
        if (_countryCode == 583) return Country.MICRONESIA;
        if (_countryCode == 498) return Country.MOLDOVA;
        if (_countryCode == 492) return Country.MONACO;
        if (_countryCode == 496) return Country.MONGOLIA;
        if (_countryCode == 499) return Country.MONTENEGRO;
        if (_countryCode == 504) return Country.MOROCCO;
        if (_countryCode == 508) return Country.MOZAMBIQUE;
        if (_countryCode == 104) return Country.MYANMAR_BURMA;
        if (_countryCode == 516) return Country.NAMIBIA;
        if (_countryCode == 520) return Country.NAURU;
        if (_countryCode == 524) return Country.NEPAL;
        if (_countryCode == 528) return Country.NETHERLANDS;
        if (_countryCode == 554) return Country.NEW_ZEALAND;
        if (_countryCode == 558) return Country.NICARAGUA;
        if (_countryCode == 562) return Country.NIGER;
        if (_countryCode == 566) return Country.NIGERIA;
        if (_countryCode == 807) return Country.NORTH_MACEDONIA;
        if (_countryCode == 578) return Country.NORWAY;
        if (_countryCode == 512) return Country.OMAN;
        if (_countryCode == 586) return Country.PAKISTAN;
        if (_countryCode == 585) return Country.PALAU;
        if (_countryCode == 275) return Country.PALESTINE;
        if (_countryCode == 591) return Country.PANAMA;
        if (_countryCode == 598) return Country.PAPUA_NEW_GUINEA;
        if (_countryCode == 600) return Country.PARAGUAY;
        if (_countryCode == 604) return Country.PERU;
        if (_countryCode == 608) return Country.PHILIPPINES;
        if (_countryCode == 616) return Country.POLAND;
        if (_countryCode == 620) return Country.PORTUGAL;
        if (_countryCode == 634) return Country.QATAR;
        if (_countryCode == 642) return Country.ROMANIA;
        if (_countryCode == 643) return Country.RUSSIA;
        if (_countryCode == 646) return Country.RWANDA;
        if (_countryCode == 659) return Country.SAINT_KITTS_AND_NEVIS;
        if (_countryCode == 662) return Country.SAINT_LUCIA;
        if (_countryCode == 670) return Country.SAINT_VINCENT_AND_THE_GRENADINES;
        if (_countryCode == 882) return Country.SAMOA;
        if (_countryCode == 674) return Country.SAN_MARINO;
        if (_countryCode == 678) return Country.SAO_TOME_AND_PRINCIPE;
        if (_countryCode == 682) return Country.SAUDI_ARABIA;
        if (_countryCode == 686) return Country.SENEGAL;
        if (_countryCode == 688) return Country.SERBIA;
        if (_countryCode == 690) return Country.SEYCHELLES;
        if (_countryCode == 694) return Country.SIERRA_LEONE;
        if (_countryCode == 702) return Country.SINGAPORE;
        if (_countryCode == 703) return Country.SLOVAKIA;
        if (_countryCode == 705) return Country.SLOVENIA;
        if (_countryCode == 90) return Country.SOLOMON_ISLANDS;
        if (_countryCode == 706) return Country.SOMALIA;
        if (_countryCode == 710) return Country.SOUTH_AFRICA;
        if (_countryCode == 728) return Country.SOUTH_SUDAN;
        if (_countryCode == 724) return Country.SPAIN;
        if (_countryCode == 144) return Country.SRI_LANKA;
        if (_countryCode == 729) return Country.SUDAN;
        if (_countryCode == 740) return Country.SURINAME;
        if (_countryCode == 752) return Country.SWEDEN;
        if (_countryCode == 756) return Country.SWITZERLAND;
        if (_countryCode == 760) return Country.SYRIA;
        if (_countryCode == 158) return Country.TAIWAN;
        if (_countryCode == 762) return Country.TAJIKISTAN;
        if (_countryCode == 834) return Country.TANZANIA;
        if (_countryCode == 764) return Country.THAILAND;
        if (_countryCode == 768) return Country.TOGO;
        if (_countryCode == 776) return Country.TONGA;
        if (_countryCode == 780) return Country.TRINIDAD_AND_TOBAGO;
        if (_countryCode == 788) return Country.TUNISIA;
        if (_countryCode == 792) return Country.TURKEY;
        if (_countryCode == 795) return Country.TURKMENISTAN;
        if (_countryCode == 798) return Country.TUVALU;
        if (_countryCode == 800) return Country.UGANDA;
        if (_countryCode == 804) return Country.UKRAINE;
        if (_countryCode == 784) return Country.UNITED_ARAB_EMIRATES;
        if (_countryCode == 826) return Country.UNITED_KINGDOM;
        if (_countryCode == 840) return Country.UNITED_STATES;
        if (_countryCode == 858) return Country.URUGUAY;
        if (_countryCode == 860) return Country.UZBEKISTAN;
        if (_countryCode == 548) return Country.VANUATU;
        if (_countryCode == 336) return Country.VATICAN_CITY;
        if (_countryCode == 862) return Country.VENEZUELA;
        if (_countryCode == 704) return Country.VIETNAM;
        if (_countryCode == 887) return Country.YEMEN;
        if (_countryCode == 894) return Country.ZAMBIA;
        if (_countryCode == 716) return Country.ZIMBABWE;

        return Country.NULL; // Return NULL for unknown country code
    }

    function getCreditScore(uint256 creditScoreNumber) internal pure returns (CreditScore creditScore) {
        return CreditScore(uint8(creditScoreNumber));
    }

    function getProvider(uint256 providerNumber) internal pure returns (Provider provider) {
        return Provider(uint8(providerNumber));
    }
}
