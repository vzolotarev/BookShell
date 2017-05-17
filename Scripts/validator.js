(function ($) {
    $.extend(true, $.validator, {

        prototype: {

            defaultShowErrors: function () {
                var self = this;
                $.each(this.successList, function (index, value) {
                    $(value).removeClass(self.settings.errorClass)
                        .addClass(self.settings.validClass)
                        .off(".validator");
                    if (self.settings.unhighlight) {
                        self.settings.unhighlight.call(self, value, self.settings.errorClass, self.settings.validClass);
                    }
                });
                $.each(this.errorList, function (index, value) {
                    var element = $(value.element).removeClass(self.settings.validClass)
                                    .addClass(self.settings.errorClass)
                                    .tooltip("destroy")
                                    .tooltip(self.apply_tooltip_options(value.element, value.message))
                                    .on("mouseenter.validator, focus.validator", function () {
                                        if (!$(this).next().hasClass('tooltip')) {
                                            $(this).tooltip('show');
                                        }
                                    }).on("mouseleave.validator", function () {
                                        $(this).tooltip('hide');
                                    });
                    if (element.is(":focus")) {
                        element.tooltip('show');
                    }
                    if (self.settings.highlight) {
                        self.settings.highlight.call(self, value.element, self.settings.errorClass, self.settings.validClass);
                    }
                });

                if (this.settings.unhighlight) {
                    for (var i = 0, elements = this.validElements() ; elements[i]; i++) {
                        $(elements[i]).removeClass(self.settings.errorClass)
                            .addClass(self.settings.validClass)
                            .off(".validator")
                            .tooltip('destroy');
                        this.settings.unhighlight.call(this, elements[i], this.settings.errorClass, this.settings.validClass);
                    }
                }
            },

            hideErrors: function () {
                var self = this;
                $.each(this.elements(), function (index, value) {
                    $(value).removeClass(self.settings.errorClass).addClass(self.settings.validClass)
                        .off(".validator")
                        .tooltip('destroy');

                    if (self.settings.unhighlight) {
                        self.settings.unhighlight.call(self, value, self.settings.errorClass, self.settings.validClass);
                    }
                });
            },

            apply_tooltip_options: function (element, message) {
                var options = {
                    /* Using Twitter Bootstrap Defaults if no settings are given */
                    animation: $(element).data('animation') || true,
                    html: $(element).data('html') || false,
                    placement: $(element).data('placement') || 'top',
                    selector: $(element).data('animation') || false,
                    title: $(element).attr('title') || message,
                    trigger: $.trim('manual ' + ($(element).data('trigger') || '')),
                    delay: $(element).data('delay') || 0,
                    container: $(element).data('container') || false
                };
                if (this.settings.tooltip_options && this.settings.tooltip_options[element.name]) {
                    $.extend(options, this.settings.tooltip_options[element.name]);
                }
                return options;
            }
        }
    });
}(jQuery));