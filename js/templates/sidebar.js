(function(){dust.register("sidebar",body_0);function body_0(chk,ctx){return chk.section(ctx.get("VideoBasic"),ctx,{"block":body_1},null).section(ctx.get("HSIA"),ctx,{"block":body_2},null).section(ctx.get("CVOIP"),ctx,{"block":body_3},null).section(ctx.get("CHN"),ctx,{"block":body_4},null).write("<div class=\"total\" href=\"#/u-verse/total\"><h1>Bundle Total</h1><div class=\"once\"><h4>One Time</h4><p>$").reference(ctx.get("totalOneTimeCharges"),ctx,"h").write("</p></div><div class=\"monthly\"><h4>Monthly</h4><p>$").reference(ctx.get("total"),ctx,"h").write("</p></div></div><a class=\"checkout\" href=\"#/u-verse/checkout\">View Package details</a>");}function body_1(chk,ctx){return chk.write("<a class=\"bundle ").reference(ctx.get("componentCode"),ctx,"h").write("\" href=\"#/u-verse/").reference(ctx.get("componentCode"),ctx,"h").write("\"><figure></figure><h2>").reference(ctx.get("displayName"),ctx,"h").write("</h2><div class=\"once\"><h4>One Time</h4><p>$").reference(ctx.get("totalOneTimeCharges"),ctx,"h").write("</p></div><div class=\"monthly\"><h4>Monthly</h4><p>$").reference(ctx.get("total"),ctx,"h").write("</p></div></a>");}function body_2(chk,ctx){return chk.write("<a class=\"bundle ").reference(ctx.get("componentCode"),ctx,"h").write("\" href=\"#/u-verse/").reference(ctx.get("componentCode"),ctx,"h").write("\"><figure></figure><h2>").reference(ctx.get("displayName"),ctx,"h").write("</h2><div class=\"once\"><h4>One Time</h4><p>$").reference(ctx.get("totalOneTimeCharges"),ctx,"h").write("</p></div><div class=\"monthly\"><h4>Monthly</h4><p>$").reference(ctx.get("total"),ctx,"h").write("</p></div></a>");}function body_3(chk,ctx){return chk.write("<a class=\"bundle ").reference(ctx.get("componentCode"),ctx,"h").write("\" href=\"#/u-verse/").reference(ctx.get("componentCode"),ctx,"h").write("\"><figure></figure><h2>").reference(ctx.get("displayName"),ctx,"h").write("</h2><div class=\"once\"><h4>One Time</h4><p>$").reference(ctx.get("totalOneTimeCharges"),ctx,"h").write("</p></div><div class=\"monthly\"><h4>Monthly</h4><p>$").reference(ctx.get("total"),ctx,"h").write("</p></div></a>");}function body_4(chk,ctx){return chk.write("<a class=\"bundle ").reference(ctx.get("componentCode"),ctx,"h").write("\" href=\"#/u-verse/").reference(ctx.get("componentCode"),ctx,"h").write("\"><figure></figure><h2>").reference(ctx.get("displayName"),ctx,"h").write("</h2><div class=\"once\"><h4>One Time</h4><p>$").reference(ctx.get("totalOneTimeCharges"),ctx,"h").write("</p></div><div class=\"monthly\"><h4>Monthly</h4><p>$").reference(ctx.get("total"),ctx,"h").write("</p></div></a>");}return body_0;})();