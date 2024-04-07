---
layout: page
title: Pace Calculator
js: ["https://unpkg.com/imask@7.3.0/dist/imask.js", "pace.js"]
---

A million of these calculators exist, but I couldn't find a _fast_ one that doesn't require button presses and has all the distances that I want. Type in any box, and the rest will populate.


<div class="columns">
    <div class="field column is-one-quarter">
        <label class="label">Pace (mile)</label>
            <div class="control">
            <input type="text" class="input pace-input" placeholder="9'15&quot;">
        </div>
    </div>
    <div class="field column is-one-quarter">
        <label class="label">Pace (km)</label>
            <div class="control">
            <input type="text" class="input pace-km-input" placeholder="9'15&quot;">
        </div>
    </div>
    <div class="field column is-one-quarter">
        <label class="label">Speed (mph)</label>
            <div class="control">
            <input type="text" class="input mph-input" placeholder="5mph">
        </div>
    </div>
    <div class="field column is-one-quarter">
        <label class="label">Speed (kmh)</label>
            <div class="control">
            <input type="text" class="input kmh-input" placeholder="5kmh">
        </div>
    </div>
</div>


<table class="table">
    <thead>
        <tr>
            <th>Time</th>
            <th>Distance</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <div class="control">
                    <input class="input" type="text" class="input time-input time-input-1M" placeholder="7:49">
                </div>
            </td>
            <td>
                1M
            </td>
        </tr>
        <tr>
            <td>
                <div class="control">
                    <input class="input" type="text" class="input time-input time-input-5K" placeholder="7:49">
                </div>
            </td>
            <td>
                5K
            </td>
        </tr>
        <tr>
            <td>
                <div class="control">
                    <input class="input" type="text" class="input time-input time-input-4M" placeholder="7:49">
                </div>
            </td>
            <td>
                4M
            </td>
        </tr>
        <tr>
            <td>
                <div class="control">
                    <input class="input" type="text" class="input time-input time-input-5M" placeholder="7:49">
                </div>
            </td>
            <td>
                5M
            </td>
        </tr>
        <tr>
            <td>
                <div class="control">
                    <input class="input" type="text" class="input time-input time-input-10K" placeholder="7:49">
                </div>
            </td>
            <td>
                10K
            </td>
        </tr>
        <tr>
            <td>
                <div class="control">
                    <input class="input" type="text" class="input time-input time-input-15K" placeholder="7:49">
                </div>
            </td>
            <td>
                15K
            </td>
        </tr>
        <tr>
            <td>
                <div class="control">
                    <input class="input" type="text" class="input time-input time-input-10M" placeholder="7:49">
                </div>
            </td>
            <td>
                10M
            </td>
        </tr>
        <tr>
            <td>
                <div class="control">
                    <input class="input" type="text" class="input time-input time-input-12M" placeholder="7:49">
                </div>
            </td>
            <td>
                12M
            </td>
        </tr>
        <tr>
            <td>
                <div class="control">
                    <input class="input" type="text" class="input time-input time-input-20K" placeholder="7:49">
                </div>
            </td>
            <td>
                20K
            </td>
        </tr>
        <tr>
            <td>
                <div class="control">
                    <input class="input" type="text" class="input time-input time-input-half" placeholder="7:49">
                </div>
            </td>
            <td>
                Half Marathon
            </td>
        </tr>
        <tr>
            <td>
                <div class="control">
                    <input class="input" type="text" class="input time-input time-input-15M" placeholder="7:49">
                </div>
            </td>
            <td>
                15M
            </td>
        </tr>
        <tr>
            <td>
                <div class="control">
                    <input class="input" type="text" class="input time-input time-input-20M" placeholder="7:49">
                </div>
            </td>
            <td>
                20M
            </td>
        </tr>
        <tr>
            <td>
                <div class="control">
                    <input class="input" type="text" class="input time-input time-input-marathon" placeholder="7:49">
                </div>
            </td>
            <td>
                Marathon
            </td>
        </tr>
        <!-- <tr>
            <td>
                <div class="control">
                    <input class="input" type="text" class="input time-input time-input-custom" placeholder="7:49">
                </div>
            </td>
            <td>
                <div class="field has-addons">
                <p class="control">
                    <input class="input distance-input-custom" type="number" placeholder="50">
                </p>
                <p class="control">
                <span class="select">
                <select class="unit-input-custom">
                    <option>Miles</option>
                    <option>Kilometers</option>
                </select>
                </span>
                </p>
                </div>
            </td>
        </tr> -->
    </tbody>
</table>