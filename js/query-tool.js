"use strict";

// No way to get column metadata from socrata api so hard-coded for now
const COLUMN_NAMES = ["job__", "doc__", "borough", "house__", "street_name", "block", "lot", "bin__",
"job_type", "job_status", "job_status_descrp", "latest_action_date", "building_type", "community___board",
"cluster", "landmarked", "adult_estab", "loft_board", "city_owned", "little_e",
"pc_filed", "efiling_filed", "plumbing", "mechanical", "boiler", "fuel_burning", "fuel_storage",
"standpipe", "sprinkler", "fire_alarm", "equipment", "fire_suppression", "curb_cut",
"other", "other_description", "applicant_s_first_name", "applicant_s_last_name",
"applicant_professional_title", "applicant_license__", "professional_cert", "pre__filing_date",
"paid", "fully_paid", "assigned", "approved", "fully_permitted", "initial_cost", "total_est__fee",
"fee_status", "existing_zoning_sqft", "proposed_zoning_sqft", "horizontal_enlrgmt", "vertical_enlrgmt",
"enlargement_sq_footage", "street_frontage", "existingno_of_stories", "proposed_no_of_stories",
"existing_height", "proposed_height", "existing_dwelling_units", "proposed_dwelling_units",
"existing_occupancy", "proposed_occupancy", "site_fill", "zoning_dist1", "zoning_dist2",
"zoning_dist3", "special_district_1", "special_district_2", "owner_type", "non_profit",
"owner_s_first_name", "owner_s_last_name", "owner_s_business_name", "owner_s_house_number",
"owner_shouse_street_name", "city_", "state", "zip", "owner_sphone__", "job_description",
"dobrundate", "job_s1_no", "total_construction_floor_area", "withdrawal_flag", "signoff_date",
"special_action_status", "special_action_date", "building_class", "job_no_good_count",
"gis_latitude", "gis_longitude", "gis_council_district", "gis_census_tract", "gis_nta_name", "gis_bin"]

const APP_TOKEN = '3ZQtrrwlB3jtvceQEj6V5mA8e&_=1563558511638';

$( document ).ready(function() {
  let columnInfo = [];
  const $table = $( "table" );

  COLUMN_NAMES.map(col_name => columnInfo.push({
    field: col_name,
    title: underscoresToSpace(firstLetterUpperCase(col_name)),
    sortable: true
  }))

  $table.bootstrapTable({
      columns: columnInfo,
      formatLoadingMessage: function () {
        return '<img src="images/ball-triangle.svg" />';
      }
  });
  $('.fixed-table-container').hide();
  $('.dropdown-toggle').hide();
  $('.search-results').hide();
  $( ".search-input" ).attr('placeholder','Search...');

  $( ".search-input" ).on('change', (event) => {
    let url = `https://data.cityofnewyork.us/resource/rvhx-8trz.json?$q=${event.target.value}&$$app_token=${APP_TOKEN}&$order=job__`;
    $table.bootstrapTable('refresh', {
      url: url
    })
    $('.fixed-table-container').show();
    $('.dropdown-toggle').show();
    $('.search-results').show();
    $('.search-term')[0].innerHTML = `\"${event.target.value}\"`
  });
});

// to avoid adding default bootstrap table order parameter to url
function queryParams(params) {
  params = {};
  return params
}

function firstLetterUpperCase(text){
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function underscoresToSpace(text){
  return text.replace(/_/g, ' ');
}
