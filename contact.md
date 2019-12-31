---
title: Contact
subtitle: Get in touch with me
layout: page
---

<div class="columns">
    <div class="column one-half">
        <h2>Get in Touch</h2>
        <p>Hi! My preferred method of communication is via the form to the right, or via my email, <a href="mailto:me@willbarkoff.dev">me@willbarkoff.dev</a>. In addition, you can tweet me <a href="https://twitter.com/willbarkoff">@willbarkoff</a>.</p>
        <h4><i class="fa fa-exclamation-triangle"></i> Found an Issue?</h4>
        <p>Most of my projects are open source on Github. If you have found an issue, feel free to use the form on the right, or open an issue on the Github repository associated with that project.</p>
        <h4><i class="fa fa-key"></i> Encrypt a message</h4>
        <p>Feel free to encrypt your message to me with my PGP key, available <a href="/key">here</a>.</p>
    </div>
    <div class="column one-half">
        <h2>Email Me</h2>
        <form action="https://formspree.io/me@willbarkoff.dev" method="POST">
            <div class="field">
                <label class="label">Name</label>
                <div class="control">
                    <input class="input" type="text" name="name" required placeholder="Joe Schmo">
                </div>
            </div>
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" type="email" name="email" required placeholder="jschmo@company.com">
                </div>
            </div>
            <div class="field">
                <label class="label">Subject</label>
                <div class="control">
                    <input class="input" type="subject" name="subject" required placeholder="A very important message!">
                </div>
            </div>
            <div class="field">
                <label class="label">Message</label>
                <div class="control">
                    <textarea class="textarea" placeholder="Hey Will..."></textarea>
                </div>
            </div>
            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-primary" name="submit" type="submit">Submit</button>
                </div>
                <div class="control">
                    <a href="mailto:me@willbarkoff.dev" class="button is-light is-link">Use default mail client</a>
                </div>
                <div class="control">
                    <button type="reset" class="button is-danger is-light">Clear</button>
                </div>
            </div>
        </form>
    </div>
