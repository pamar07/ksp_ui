var datepickerObj = (function () {
  return{
    newDatepicker: function () {

        var cd = new Date();

        /* Date manipulation for Plan Date */
        $('.dStrPlan').html(dateFormat(cd, "mmmm yyyy"));

        $('.monPlan').val(dateFormat(cd, "mmm"));
        $('.dayPlan').val(dateFormat(cd, "dd"));
        $('.yearPlan').val(dateFormat(cd, "yyyy"));

        $('.pyearPlan').click(function () {
            cd.setYear(cd.getFullYear() + 1);
            updateF_Plan();
        });
        $('.pmonPlan').click(function () {
            cd.setMonth(cd.getMonth() + 1);
            updateF_Plan();
        });
        $('.pdayPlan').click(function () {
            cd.setDate(cd.getDate() + 1);
            updateF_Plan();
        });
        $('.myearPlan').click(function () {
            cd.setYear(cd.getFullYear() - 1);
            updateF_Plan();
        });
        $('.mmonPlan').click(function () {
            cd.setMonth(cd.getMonth() - 1);
            updateF_Plan();
        });
        $('.mdayPlan').click(function () {
            cd.setDate(cd.getDate() - 1);
            updateF_Plan();
        });

        function updateF_Plan() {
            $('.yearPlan').val(dateFormat(cd, "yyyy"));
            $('.monPlan').val(dateFormat(cd, "mmm"));
            $('.dayPlan').val(dateFormat(cd, "dd"));

            $('.dStrPlan').html(dateFormat(cd, "mmmm yyyy"));
        }

        /* Date manipulation for Due Date */
        //$('.dStrDue').html(dateFormat(cd, "mmmm dd yyyy"));
        $('.dStrDue').html(dateFormat(cd, "fullDate"));

        $('.monDue').val(dateFormat(cd, "mmm"));
        $('.dayDue').val(dateFormat(cd, "dd"));
        $('.yearDue').val(dateFormat(cd, "yyyy"));

        $('.pyearDue').click(function () {
            cd.setYear(cd.getFullYear() + 1);
            updateF_Due();
        });
        $('.pmonDue').click(function () {
            cd.setMonth(cd.getMonth() + 1);
            updateF_Due();
        });
        $('.pdayDue').click(function () {
            cd.setDate(cd.getDate() + 1);
            updateF_Due();
        });
        $('.myearDue').click(function () {
            cd.setYear(cd.getFullYear() - 1);
            updateF_Due();
        });
        $('.mmonDue').click(function () {
            cd.setMonth(cd.getMonth() - 1);
            updateF_Due();
        });
        $('.mdayDue').click(function () {
            cd.setDate(cd.getDate() - 1);
            updateF_Due();
        });

        function updateF_Due() {
            $('.yearDue').val(dateFormat(cd, "yyyy"));
            $('.monDue').val(dateFormat(cd, "mmm"));
            $('.dayDue').val(dateFormat(cd, "dd"));

            $('.dStrDue').html(dateFormat(cd, "mmmm dd yyyy"));
        }
    }
  }
})(datepickerObj || {})
