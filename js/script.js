$(document).ready(function () {
  $(".shelter").hover(
    function () {
      $(".shelter").addClass("visible"); // hover 시 visible 클래스 추가
    },
    function () {
      $(".shelter").removeClass("visible"); // hover 해제 시 visible 클래스 제거
    }
  );

  $(".help").hover(
    function () {
      $(".help").addClass("visible"); // hover 시 visible 클래스 추가
    },
    function () {
      $(".help").removeClass("visible"); // hover 해제 시 visible 클래스 제거
    }
  );

  $(".happy").hover(
    function () {
      $(".happy").addClass("visible"); // hover 시 visible 클래스 추가
    },
    function () {
      $(".happy").removeClass("visible"); // hover 해제 시 visible 클래스 제거
    }
  );

  Highcharts.chart("abondonedcontainer", {
    exporting: {
      enabled: false,
    },
    chart: {
      type: "column",
      backgroundColor: "#1B1B1B", // 그래프 배경색
    },
    title: {
      text: "반려동물 관련 업체 및 종사자 현황",
      align: "center",
      style: {
        color: "#FFFFFF", // 제목 텍스트 색상
        fontWeight: "bold",
      },
    },
    xAxis: {
      categories: ["반려동물 관련 영업 업체", "반려동물 관련 영업 종사자"],
      labels: {
        style: {
          color: "#FFFFFF", // x축 레이블 텍스트 색상
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Percent",
        style: {
          color: "#FFFFFF", // y축 제목 텍스트 색상
        },
      },
      labels: {
        style: {
          color: "#FFFFFF", // y축 레이블 텍스트 색상
        },
      },
    },
    legend: {
      itemStyle: {
        color: "#FFFFFF", // 범례 텍스트 색상
      },
    },
    tooltip: {
      pointFormat:
        '<span style="color:{series.color}">{series.name}</span>' +
        ": <b>{point.y}</b> ({point.percentage:.0f}%)<br/>",
      shared: true,
    },
    plotOptions: {
      column: {
        stacking: "percent",
        dataLabels: {
          enabled: true,
          format: "{point.percentage:.0f}%",
          style: {
            color: "#806B00", // 데이터 레이블 텍스트 색상
            textOutline: "none", // 텍스트 윤곽선 제거
          },
        },
        // 테두리 제거
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "이외",
        data: [15408, 17609],
        color: "#D9D9D9", // 이외 색상
      },
      {
        name: "전시업",
        data: [638, 822],
        color: "#FFF0A3", // 전시업 색상
      },
      {
        name: "생산업",
        data: [2086, 2744],
        color: "#F7D831", // 생산업 색상
      },
      {
        name: "판매업",
        data: [3944, 4868],
        color: "#E4C003", // 판매업 색상
      },
    ],
  });

  // shelter 그래프

  (function (H) {
    H.seriesTypes.pie.prototype.animate = function (init) {
      const series = this,
        chart = series.chart,
        points = series.points,
        { animation } = series.options,
        { startAngleRad } = series;

      function fanAnimate(point, startAngleRad) {
        const graphic = point.graphic,
          args = point.shapeArgs;

        if (graphic && args) {
          graphic
            // Set inital animation values
            .attr({
              start: startAngleRad,
              end: startAngleRad,
              opacity: 1,
            })
            // Animate to the final position
            .animate(
              {
                start: args.start,
                end: args.end,
              },
              {
                duration: animation.duration / points.length,
              },
              function () {
                // On complete, start animating the next point
                if (points[point.index + 1]) {
                  fanAnimate(points[point.index + 1], args.end);
                }
                // On the last point, fade in the data labels, then
                // apply the inner size
                if (point.index === series.points.length - 1) {
                  series.dataLabelsGroup.animate(
                    {
                      opacity: 1,
                    },
                    void 0,
                    function () {
                      points.forEach((point) => {
                        point.opacity = 1;
                      });
                      series.update(
                        {
                          enableMouseTracking: true,
                        },
                        false
                      );
                      chart.update({
                        plotOptions: {
                          pie: {
                            innerSize: "40%",
                            borderRadius: 8,
                          },
                        },
                      });
                    }
                  );
                }
              }
            );
        }
      }

      if (init) {
        // Hide points on init
        points.forEach((point) => {
          point.opacity = 0;
        });
      } else {
        fanAnimate(points[0], startAngleRad);
      }
    };
  })(Highcharts);

  Highcharts.chart("sheltercontainer", {
    exporting: {
      enabled: false,
    },
    chart: {
      type: "pie",
    },
    title: {
      text: "지역 별 동물 보호 센터 현황",
      align: "center",
    },
    subtitle: {
      text: "Custom animation of pie series",
      align: "center",
    },
    tooltip: {
      headerFormat: "",
      pointFormat:
        '<span style="color:{point.color}">\u25cf</span> ' +
        "{point.name}: <b>{point.percentage:.1f}%</b>", // 소수점 1자리
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        borderWidth: 2,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b><br>{point.percentage:.1f}%", // 소수점 1자리
          distance: 20,
        },
      },
    },
    colors: [
      "#2A8069", // 서울
      "#0A9D76", // 경기
      "#3BB997", // 강원
      "#46D2AC", // 충북
      "#47EABF", // 충남
      "#09F0B2", // 경북
      "#71FFD9", // 경남
      "#BDFFED", // 전북
      "#ECFFFA", // 전남
      "#ECFFFA", // 제주
    ],
    series: [
      {
        enableMouseTracking: false,
        animation: {
          duration: 2000,
        },
        colorByPoint: true,
        data: [
          { name: "서울", y: 20 },
          { name: "경기", y: 38 },
          { name: "강원", y: 18 },
          { name: "충북", y: 9 },
          { name: "충남", y: 19 },
          { name: "경북", y: 47 },
          { name: "경남", y: 38 },
          { name: "전북", y: 26 },
          { name: "전남", y: 23 },
          { name: "제주", y: 1 },
        ],
      },
    ],
  });
});
