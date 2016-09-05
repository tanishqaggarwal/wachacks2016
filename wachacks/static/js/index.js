smoothScroll.init();

$(document).ready(function () {
			//initialize();
			$('.modal-trigger').leanModal({
				dismissible: true,
				// ready: function () {
				// 	google.maps.event.trigger($("#googleMap"), 'resize');
				// }
			});
		});

if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))) {
	$(function() {
		$(".title").typed({
			strings: ["<large> <b>WAC</b></large> | Hacks^3000", " Totally <i>whack</i> hacks!^2000"],
			contentType: 'html',
			loop: true,
			typeSpeed: 2,
			showCursor: false
		});
	});
}
else {
	$("#title").html("<large><b>WAC</b></large> | Hacks");
}

$(function() {
	$('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});
});

$("#emailsubmit").click(function() {
	function validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	if (!(validateEmail($("#email").val()))) {
		$("#email").removeClass("valid");
		$("#email").addClass("invalid");
		Materialize.toast("Please enter a valid email address!", 2000);
	}
	else {
		$("#email").removeClass("invalid");
		$("#email").addClass("valid");
		$.ajax({
			method: "POST",
			url: "/subscribe",
			data: {
				email: $("#email").val(),
			},
			success: function() {
				$("#email").val("");
			}
		});
		window.open("https://wachacks.typeform.com/to/fUmmUb", "_blank");
	}
});