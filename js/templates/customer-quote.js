(function(){dust.register("customer-quote",body_0);function body_0(chk,ctx){return chk.write("<div class=\"modal modal-customer-quote\"><div class=\"ir close_modal\"><span>close</span></div><div class=\"content_modal\"><h1>Generate Customer Quote</h1><form method=\"post\" name=\"customer-quote\"><div>\t<input id=\"email\" type=\"checkbox\" name=\"email\" value=\"email\"><label for=\"email\">Email</label><input id=\"print\" type=\"checkbox\" name=\"print\" value=\"print\"><label for=\"print\">Print</label></div><div class=\"col left\"><dl><dt>Language</dt><dd><input type=\"text\" placeholder=\"English\" class=\"dropdown\"></dd><dt>Customer Email</dt><dd><input type=\"text\" placeholder=\"enter email address\"></dd><dt>Confirm Customer Email</dt><dd><input type=\"text\" placeholder=\"re-enter email address\"></dd></dl></div><div class=\"col right\"><dl><dt>Sales Agent / Rep Name</dt><dd><input type=\"text\" placeholder=\"enter first and last name\" value=\"\"></dd><dt>Sales Agent / Rep Contact #</dt><dd><input type=\"text\" placeholder=\"enter phone number\" value=\"\"></dd><dt>Sales Agent / Rep Email</dt><dd><input type=\"text\" placeholder=\"enter email address\" value=\"\"></dd></dl></div><ul><li><input id=\"include-channel\" type=\"checkbox\" name=\"email\" value=\"include-channel\"><label for=\"include-channel\">Include channel listing</label></li><li><input id=\"include-sales-info\" type=\"checkbox\" name=\"email\" value=\"include-sales-info\"><label for=\"include-sales-info\">Include sales contact information</label></li><li><input id=\"customer-followup\" type=\"checkbox\" name=\"email\" value=\"customer-followup\"><label for=\"customer-followup\">Customer autorizes follow up</label></li></ul><div class=\"buttons\"><input type=\"reset\" class=\"button gray\" value=\"Clear\" /><input type=\"submit\" class=\"button orange\" value=\"Submit\" /></div></form></div></div><div class=\"overlay\"></div>");}return body_0;})();