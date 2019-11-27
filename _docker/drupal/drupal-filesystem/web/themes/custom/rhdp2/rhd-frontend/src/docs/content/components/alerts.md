---
title: "Alerts"
date: 2018-04-17T14:39:40-04:00
description: ""
draft: false
tags: ["component"]
categories: ["component"]
weight: 99
scripts: ["@patternfly/pfelement/pfelement.umd","@rhd/dp-alert"]
---

{{< code >}}<dp-alert title="Default alert with a Heading:">This is the default alert text</dp-alert>{{</ code >}}
{{< code >}}<dp-alert type="success" title="Success Heading:">This is the success text</dp-alert>{{</ code >}}
{{< code >}}<dp-alert type="warning" title="Warning Heading:">This is the warning text</dp-alert>{{</ code >}}
{{< code >}}<dp-alert type="danger" title="Danger Heading:">This is the danger text</dp-alert>{{</ code >}}
{{< code >}}<dp-alert type="info" title="Info Heading:">This is the info text</dp-alert>{{</ code >}}
{{< code >}}<dp-alert title="Sample with Action">Description with additional action <a slot="dp-alert__description" class="close" href="#"><i class="fas fa-times"></i></a></dp-alert>{{</ code >}}
{{< code >}}<dp-alert type="info" title="Welcome jboss.org members!">It's true &mdash; JBoss Developer and Red Hat Developer Program are joining forces. You can find all the great Middleware information that you were looking for right here on developers.redhat.com. <a href="https://developer.jboss.org/blogs/mark.little/2017/08/31/we-are-moving?_sscc=t">Read more about this on our blog.</a></dp-alert>{{</ code >}}



