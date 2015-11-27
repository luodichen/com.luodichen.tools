function on_query_button_clicked() {
    domain = $("#string-field").val();
    if (domain == '') {
        $("#domain-alert").removeClass("hidden");
        return;
    }
	var hash = md5($("#string-field").val()); 
	
    $("#result-panel").removeClass('hidden');
    $("#md5-result").html(hash);


}