---
title: Contact
subtitle: Get in touch with me
layout: page
---

<div class="row">
    <div class="col-md-6">
        <h3>Get in Touch</h3>
        <p>Hi! My preferred method of communication is via the form to the right, or via my email, <a href="mailto:me@williambarkoff.com">me@williambarkoff.com</a>. In addition, you can tweet me <a href="https://twitter.com/willbarkoff">@willbarkoff</a>.</p>
        <h4><i class="fa fa-exclamation-triangle"></i> Found an Issue?</h4>
        <p>Most of my projects are open source on Github. If you have found an issue, feel free to use the form on the left, or open an issue on the Github repository associated with that project.</p>
        <h4><i class="fa fa-key"></i> Encrypt a message</h4>
        <p>Feel free to encrypt your message to me with my PGP key, available <a href="/key">here</a>.</p>
    </div>
    <div class="col-md-6">
        <h3>Email Me</h3>
        <form action="https://formspree.io/me@williambarkoff.com" method="POST">
            <form>
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-6">
                            <label for="text">Name</label>
                            <div class="input-group">
                                <input id="text" name="text" type="text" required="required" class="form-control here" placeholder="Joe Schmo">
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <label for="email">Email</label>
                            <div class="input-group">
                                <input id="email" name="email" type="email" class="form-control here" required="required" placeholder="jschmo@company.com">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="subject">Subject</label>
                    <input id="subject" name="subject" type="text" class="form-control here" placeholder="A very important message!">
                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" name="message" cols="40" rows="5" class="form-control" placeholder="Hey William..."></textarea>
                </div>
                <div class="form-group">
                    <button name="submit" type="submit" class="btn btn-primary">Send</button>
                    <a href="mailto:me@williambarkoff.com" class="btn btn-outline-primary">Use default mail client</a>
                    <button type="reset" class="btn btn-outline-danger">Clear</button>
                </div>
            </form>
        </form>
    </div>
