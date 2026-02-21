---
title: PGP Key
subtitle: Encrypt communications with me
layout: page
hidden: true
---

My email ([william@barkoffusa.com](mailto:william@barkoffusa.com)) supports the [Web Key Directory](https://wiki.gnupg.org/WKD) standard, so many email clients will automatically import my key. If your email client doesn't do that, you can add my key to your keyring:

```shell
gpg --locate-keys william@barkoffusa.com
```

If that doesn't work (it only works in newer versions of `gpg`), you should be able to get my key by it's fingerprint, `5F04BC734C64CB0F8CCF4F437015D84BE9E1BC08`.

```shell
gpg --recv-keys 5F04BC734C64CB0F8CCF4F437015D84BE9E1BC08
```

If something goes wrong with that, you can download my key from the [OpenPGP Keyserver](https://keys.openpgp.org/search?q=william@barkoffusa.com).