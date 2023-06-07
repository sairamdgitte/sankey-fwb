am5.ready(function () {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("chartdivpub");
    root._logo.dispose();
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    // Create series
    // https://www.amcharts.com/docs/v5/charts/flow-charts/
    var series = root.container.children.push(
        am5flow.Sankey.new(root, {
            orientation: "horizontal",
            sourceIdField: "from",
            targetIdField: "to",
            valueField: "value"
        })
    );

    series.nodes.rectangles.template.setAll({
        fillOpacity: 0,
        strokeOpacity: 0
    });

    series.links.template.setAll({
        tooltipText: null,
        templateField: "linkSettings",
        fillOpacity: 1,
        strokeOpacity: 1,
        interactive: true
    });
    series.links.template.states.create("hover", {
        fillOpacity: 1
    });
    series.nodes.labels.template.setAll({
        forceHidden: true,
        templateField: "labelSettings"
    });

    series.nodes.data.setAll([
        {
            id: "Fairfax Media Management",
            fill: am5.color(0x26a660),
            labelSettings: {
                rotation: -90,
                textAlign: "center",
                text: "Fairfax Media Mngmt\n[bold](40,306 ARTICLES)",
                forceHidden: false,
                centerY: am5.p100,
                dy: 15
            }
        },

        {
            id: "fairfax digital australia new zealand",
            fill: am5.color(0x26a660),
            labelSettings: {
                // rotation: -90,
                textAlign: "center",
                text:
                    "[#0000 fontSize:0.9em]Fairfax digital ANZ [bold fontSize:0.9em](4,572 Articles)",
                fill: am5.color(0xffffff),
                forceHidden: false,
                dx: -130
            },
        },
        {
            id: "f2 australia new zealand",
            fill: am5.color(0x26a660),
            labelSettings: {
                // rotation: -90,
                textAlign: "center",
                text:
                    "[#0000 fontSize:0.9em]F2 ANZ [bold #0000 fontSize:0.9em](4,066 ARTICLES)",
                fill: am5.color(0xffffff),
                forceHidden: false,
                // centerY: am5.p100,
                // dy:26,
                dx: -100
            }
        },
        {
            id: "federal capital press of australia",
            fill: am5.color(0x26a660),
            labelSettings: {
                // rotation: -90,
                textAlign: "center",
                text:
                    "[#0000 fontSize:0.9em]FED Cap. Press [bold #0000 fontSize:0.9em](2,643 ARTICLES)",
                fill: am5.color(0xffffff),
                forceHidden: false,
                // centerY: am5.p100
                // dy:28,
                dx: -123
            }
        },
        {
            id: "ht digital streams",
            fill: am5.color(0x26a660),
            labelSettings: {
                // rotation: -90,
                textAlign: "center",
                text:
                    "[#0000 fontSize:0.9em]HT Digital [bold #0000 fontSize:0.9em](2,048 ARTICLES)",
                fill: am5.color(0xffffff),
                forceHidden: false,
                // centerY: am5.p100
                // dy:21,
                dx: -108
            }
        },
        {
            id: "Nationwide News",
            fill: am5.color(0x26a660),
            labelSettings: {
                rotation: -90,
                textAlign: "center",
                text:
                    "[fontSize:0.9em]Nationwide\n [fontSize:0.9em]News\n[bold fontSize:0.9em](32,436 ARTICLES)",
                fill: am5.color(0x000000),
                forceHidden: false,
                // centerY: am5.p100,
                dx: -35,
                dy: 15
            }
        },

        {
            id: "News Corp",
            fill: am5.color(0x26a660),
            labelSettings: {
                // rotation: -90,
                textAlign: "center",
                text: "News Corp\n[bold](19,637 ARTICLES)",
                forceHidden: false,
                // centerY: am5.p105,
                dy: 1,
                dx: -90
            }
        },
        {
            id: "apn newspapers",
            fill: am5.color(0x26a660),
            labelSettings: {
                // rotation: -90,
                textAlign: "center",
                text:
                    "[#0000 fontSize:0.7em]APN Newspapers[bold #0000 fontSize:0.7em](4,058 ARTICLES)",
                fill: am5.color(0xffffff),
                forceHidden: false,
                // centerY: am5.p100,
                dy: -2,
                dx: -105
            }
        },
        {
            id: "west australian newspapers",
            fill: am5.color(0x26a660),
            labelSettings: {
                // rotation: -90,
                textAlign: "center",
                text:
                    "[#0000 fontSize:0.6em]West AUS Newspapers[bold #0000 fontSize:0.6em](1,607 ARTICLES)",
                fill: am5.color(0xffffff),
                forceHidden: false,
                // centerY: am5.p100,
                dy: -2,
                dx: -104
            }
        },

    ]);

    series.bullets.push(function () {
        return am5.Bullet.new(root, {
            locationX: 0.5,
            sprite: am5.Label.new(root, {
                templateField: "labelSettings",
                textAlign: "center",
                centerY: am5.p50,
                paddingTop: 0,
                paddingBottom: 0
            })
        });
    });

    series.bullets.push(function () {
        return am5.Bullet.new(root, {
            locationX: 1,
            sprite: am5.Label.new(root, {
                templateField: "labelSettings2",
                centerY: am5.p50,
                paddingTop: 0,
                paddingBottom: 0
            })
        });
    });

    series.bullets.push(function (root, series, dataItem) {
        var label = am5.Label.new(root, {
            text: "{value}",
            populateText: true,
            centerX: am5.p50,
            fill: am5.color(0xffffff),
            opacity: 0.2,
            fontSize: dataItem.get("value") / 1000
        });
        var bullet = am5.Bullet.new(root, {
            locationX: 0,
            sprite: label,
            autoRotate: true
        });

        label.adapters.add("opacity", function (opacity) {
            return 0.5 - Math.abs(0.5 - bullet.get("locationX"));
        });

        bullet.animate({
            key: "locationX",
            from: 0,
            to: 1,
            duration: Math.random() * 10000 + 20000,
            loops: Infinity
        });
        bullet.on("locationX", function () {
            label.set("opacity", label.get("opacity"));
        });

        return bullet;
    });

    // Set data
    // https://www.amcharts.com/docs/v5/charts/flow-charts/#Setting_data
    series.data.setAll([
        {
            from: "Source",
            to: "Total Articles",
            value: 110644,
            labelSettings: {
                text:
                    "[fontSize:1.5em]1990-2022 BREAKDOWN OF\nTHE AUS FINANCIAL WELL-BEING ARTICLES\n \n[/]PUBLICATION COMPANIES WITH A TOTAL OF\n [bold]110,644 ARTICLES[/]",
                rotation: 0
            }
        },

        {
            from: "Total Articles",
            to: "Lean Labour",
            value: 52906,
            labelSettings: { text: "Lean Labour\n [bold]52,906[/]" }
        },
        {
            from: "Total Articles",
            to: "Lean Liberal",
            value: 56131,
            labelSettings: { text: "Lean Liberal\n [bold]56,131[/]" }
        },
        {
            from: "Total Articles",
            to: "Lean Centre",
            value: 1607,
            labelSettings: {
                text: "[fontSize:0.6em]Lean Centre [bold fontSize:0.6em]1,607 ARTICLES[/]",
                rotation: 2,
                dy: -3
            }
        },

        { from: "Lean Labour", to: "Fairfax Media Management", value: 40306 },
        { from: "Lean Labour", to: "fairfax digital australia new zealand", value: 4572 },
        { from: "Lean Labour", to: "f2 australia new zealand", value: 4066 },
        { from: "Lean Labour", to: "federal capital press of australia", value: 2643 },
        { from: "Lean Labour", to: "ht digital streams", value: 1319 },


        { from: "Lean Liberal", to: "Nationwide News", value: 32436 },
        { from: "Lean Liberal", to: "News Corp", value: 19637 },
        { from: "Lean Liberal", to: "apn newspapers", value: 4058 },

        { from: "Lean Centre", to: "west australian newspapers", value: 1607 },

    ]);

    // Make stuff animate on load
    series.appear(100, 10);

}); // end am5.ready()