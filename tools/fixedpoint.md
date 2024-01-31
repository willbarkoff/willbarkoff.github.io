---
title: Floating Point/Fixed Point Conversion Tool
layout: page
js: ["fixedpoint.js"]
---

<h3>Fixed Point Configuration</h3>
<div class="field has-addons">
	<p class="control">
		<span class="select">
			<select class="signed-select">
				<option>Signed</option>
				<option>Unsigned</option>
			</select>
		</span>
	</p>
	<p class="control">
		<input class="input has-text-right bits-before-decimal-field" placeholder="# of bits before decimal">
	</p>
	<p class="control">
		<a class="button is-static">
		.
		</a>
	</p>
	<p class="control">
		<input class="input bits-after-decimal-field" placeholder="# of bits after decimal">
	</p>
</div>

<div class="notification is-primary is-hidden about-representation"></div>

<div class="calculator is-hidden">

<h3>Number</h3>
<div class="field">
	<label class="label">Base 10 floating point representation</label>
		<div class="control">
		<input class="input" type="number" class="input floating-point-field" placeholder="Floating point">
	</div>
	<p class="help">This is the number in base-10, floating point, as it would normally be displayed.</p>
</div>

<div class="field">
	<label class="label">Base 10 <span class="bits-before"></span>.<span class="bits-after"></span> fixed point representaion</label>
		<div class="control">
		<input class="input" type="number" class="input fixed-point-field" placeholder="Fixed point">
	</div>
	<p class="help">This is the number in base-10, fixed point, as it would be represented. This is what you would get if you called <code>print()</code> on your fixed point number.</p>
</div>

<div class="field">
	<label class="label">Unsigned base 10 <span class="bits-before"></span>.<span class="bits-after"></span> fixed point representaion</label>
		<div class="control">
		<input class="input" type="number" class="input unsigned-fixed-point-field" placeholder="Fixed point">
	</div>
	<p class="help">This is the same as the number above, but represented as an unsigned integer.</p>
</div>

<div class="columns">
	<div class="column">
		<div class="field">
			<label class="label">Hexadecimal Representation</label>
			<div class="control">
				<input class="input" type="input" class="input hex-normal disabled" disabled>
			</div>
		</div>
		<div class="field">
			<label class="label">Octal Representation</label>
			<div class="control">
				<input class="input" type="input" class="input octal-normal disabled" disabled>
			</div>
		</div>
		<div class="field">
			<label class="label">Binary Representation</label>
			<div class="control">
				<input class="input" type="input" class="input binary-normal disabled" disabled>
			</div>
		</div>
	</div>
	<div class="column">
		<div class="field">
			<label class="label">Hexadecimal Representation (Verilog)</label>
			<div class="control">
				<input class="input" type="input" class="input hex-verilog disabled" disabled>
			</div>
		</div>
		<div class="field">
			<label class="label">Octal Representation (Verilog)</label>
			<div class="control">
				<input class="input" type="input" class="input octal-verilog disabled" disabled>
			</div>
		</div>
		<div class="field">
			<label class="label">Binary Representation (Verilog)</label>
			<div class="control">
				<input class="input" type="input" class="input binary-verilog disabled" disabled>
			</div>
		</div>
	</div>
</div>

<h3>Visualization</h3>
<div class="table-container">
<table class="table is-bordered">
	<tr class="visualization-1">
	</tr>
	<tr class="visualization-2">
	</tr>
</table>
</div>

</div>