(function(){dust.register("modals-selected-channels",body_0);function body_0(chk,ctx){return chk.write("<!-- extra channels template part --><h5>Selected Channels</h5><div id=\"list-package\">").section(ctx.get("selectedChannels"),ctx,{"block":body_1},null).write("</div><p class=\"package-total\">Added to Package</p><div class=\"buttons\"><input type=\"reset\" class=\"button gray\" value=\"Clear\" /><input type=\"submit\" class=\"button orange\" value=\"Submit\" /></div>");}function body_1(chk,ctx){return chk.write("<p id=\"").reference(ctx.get("componentCode"),ctx,"h").write("\">").reference(ctx.get("displayName"),ctx,"h").write("</p>");}return body_0;})();