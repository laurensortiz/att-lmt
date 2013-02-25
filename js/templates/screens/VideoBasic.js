(function(){dust.register("screens-VideoBasic",body_0);function body_0(chk,ctx){return chk.write("<!-- tv tab -->").section(ctx.get("VideoBasic"),ctx,{"block":body_1},null).write("<hr/><div class=\"options\"><section><h3># of Receivers*</h3>").exists(ctx.get("wirelessReceivers"),ctx,{"block":body_6},null).write(" ").exists(ctx.get("wiredReceivers"),ctx,{"block":body_11},null).write("</section><section><h3>Add Selections</h3><div class=\"group\"><div class=\"custom-checkbox\"><input type=\"checkbox\" id=\"tHomeDvr\"").exists(ctx.get("tHomeDvr"),ctx,{"block":body_14},null).write("><span class=\"box\"><span class=\"tick\"></span></span></div><label for=\"homeowner\">Total Homeowner</label><div class=\"price\">$0.00</div></div><div class=\"group\"><div class=\"custom-checkbox\"><input type=\"checkbox\" id=\"hDef\"").exists(ctx.get("hDef"),ctx,{"block":body_15},null).write("><span class=\"box\"><span class=\"tick\"></span></span></div><label>High Definition</label><div class=\"price\">$0.00</div></div><div class=\"group\"><div class=\"custom-checkbox\"><input type=\"checkbox\" id=\"hdPrem\"").exists(ctx.get("hDPrem"),ctx,{"block":body_16},null).write("><span class=\"box\"><span class=\"tick\"></span></span></div><label>HD<br/> Premium</label><div class=\"price\">$0.00</div></div></section><section ><a class=\"modal-link international-programming\" href=\"#/modal/international-programming\">&gt; International Programming</a><div class=\"price\">$0.00</div><a class=\"modal-link movies-sports\" href=\"#/modal/movies-sports\">&gt; Movie, Sports &amp; SVOD</a><div class=\"price\">$0.00</div></section></div>");}function body_1(chk,ctx){return chk.write("<h1>Digital TV Packages</h1><div class=\"hero\">").section(ctx.get("attributeList"),ctx,{"block":body_2},null).write("</select><span class=\"select-text\">").reference(ctx.get("iptvPlanName"),ctx,"h").write("</span><span class=\"select-arrow\"></span></div></div></div>");}function body_2(chk,ctx){return chk.write(" ").helper("eq",ctx,{"block":body_3},{"key":body_5,"value":"availBasicPackage"}).write(" ");}function body_3(chk,ctx){return chk.write("<figure><img src=\"img/tv.jpg\" alt=\"TV with Remote and Cable Box\"></figure><div class='description'><h2>").reference(ctx.get("attributeDisplayName"),ctx,"h").write("</h2><p>TotalHome DVR, 1 wireless HD-ready Receiver and the HD Tech Fee</p><button class=\"short blue listChannels\">Channels</button><div class=\"selectbox\"><select id=\"iptvPlan\">").section(ctx.get("validValueList"),ctx,{"block":body_4},null);}function body_4(chk,ctx){return chk.write("<option value=\"").reference(ctx.get("value"),ctx,"h").write("\">").reference(ctx.get("name"),ctx,"h").write("</option>");}function body_5(chk,ctx){return chk.reference(ctx.get("attributeCode"),ctx,"h");}function body_6(chk,ctx){return chk.write(" <div class=\"group\"><div class=\"selectbox\"><select id=\"wirelessReceiver\">").section(ctx.get("wirelessReceivers"),ctx,{"block":body_7},null).write("</select><span class=\"select-text\">").section(ctx.get("wirelessReceivers"),ctx,{"block":body_9},null).write("</span><span class=\"select-arrow\"></span></div><label>Wireless</label><div class=\"price\">$49.00</div></div>");}function body_7(chk,ctx){return chk.write(" <option").exists(ctx.get("selected"),ctx,{"block":body_8},null).write(">").reference(ctx.get("value"),ctx,"h").write("</option>");}function body_8(chk,ctx){return chk.write(" selected=\"selected\"");}function body_9(chk,ctx){return chk.exists(ctx.get("selected"),ctx,{"block":body_10},null);}function body_10(chk,ctx){return chk.reference(ctx.get("value"),ctx,"h");}function body_11(chk,ctx){return chk.write("<div class=\"group\"><div class=\"selectbox\"><select id=\"wiredReceiver\"><option>0</option>").section(ctx.get("wiredReceivers"),ctx,{"block":body_12},null).write("</select><span class=\"select-text\">0</span><span class=\"select-arrow\"></span></div><label>Wired</label><div class=\"price\">$0.00</div></div>");}function body_12(chk,ctx){return chk.write(" <option").exists(ctx.get("selected"),ctx,{"block":body_13},null).write(">").reference(ctx.get("value"),ctx,"h").write("</option>");}function body_13(chk,ctx){return chk.write(" selected=\"selected\"");}function body_14(chk,ctx){return chk.write(" checked=\"checked\"");}function body_15(chk,ctx){return chk.write(" checked=\"checked\"");}function body_16(chk,ctx){return chk.write(" checked=\"checked\"");}return body_0;})();