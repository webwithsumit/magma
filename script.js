function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });


  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
loco();
function canva() {
  const canvas = document.querySelector("#page3 canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
    imgs/canva/frames00007.png
    imgs/canva/frames00010.png
    imgs/canva/frames00013.png
    imgs/canva/frames00016.png
    imgs/canva/frames00019.png
    imgs/canva/frames00022.png
    imgs/canva/frames00025.png
    imgs/canva/frames00028.png
    imgs/canva/frames00031.png
    imgs/canva/frames00034.png
    imgs/canva/frames00037.png
    imgs/canva/frames00040.png
    imgs/canva/frames00043.png
    imgs/canva/frames00046.png
    imgs/canva/frames00049.png
    imgs/canva/frames00052.png
    imgs/canva/frames00055.png
      imgs/canva/frames00058.png
      imgs/canva/frames00061.png 
      imgs/canva/frames00064.png
        imgs/canva/frames00067.png
        imgs/canva/frames00070.png
          imgs/canva/frames00073.png
          imgs/canva/frames00076.png
            imgs/canva/frames00079.png
            imgs/canva/frames00082.png
              imgs/canva/frames00085.png
              imgs/canva/frames00088.png
                imgs/canva/frames00091.png
                imgs/canva/frames00094.png
                  imgs/canva/frames00097.png
                  imgs/canva/frames00100.png
                    imgs/canva/frames00103.png
                    imgs/canva/frames00106.png 
                    imgs/canva/frames00109.png 
                    imgs/canva/frames00112.png 
                    imgs/canva/frames00115.png
                      imgs/canva/frames00118.png
                      imgs/canva/frames00121.png 
                      imgs/canva/frames00124.png
                        imgs/canva/frames00127.png
                        imgs/canva/frames00130.png
                          imgs/canva/frames00133.png
                          imgs/canva/frames00136.png
                            imgs/canva/frames00139.png
                            imgs/canva/frames00142.png
                              imgs/canva/frames00145.png
                              imgs/canva/frames00148.png
                                imgs/canva/frames00151.png
                                imgs/canva/frames00154.png
                                  imgs/canva/frames00157.png
                                  imgs/canva/frames00160.png
                                    imgs/canva/frames00163.png
                                    imgs/canva/frames00166.png
                                      imgs/canva/frames00169.png
                                      imgs/canva/frames00172.png
                                        imgs/canva/frames00175.png
                                        imgs/canva/frames00178.png 
                                        imgs/canva/frames00181.png
                                          imgs/canva/frames00184.png
                                          imgs/canva/frames00187.png
                                            imgs/canva/frames00190.png
                                            imgs/canva/frames00193.png
                                              imgs/canva/frames00196.png
                                              imgs/canva/frames00199.png
                                                imgs/canva/frames00202.png
 `;
    return data.split("\n")[index];
  }

  const frameCount = 67;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.15,
      trigger: `#page3>canvas`,
      //   set start end according to preference
      start: `top top`,
      end: `600% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({

    trigger: "#page3",
    pin: true,
    // markers:true,
    scroller: `#main`,
    //   set start end according to preference
    start: `top top`,
    end: `600% top`,
  });
  gsap.to("#page2",{
    transform : "translateY(-100%)",
    scrollTrigger:{
      scroller : "#main",
      trigger : "#page2",
      start : "top top",
      end: "400% top",
      // markers : true,
      scrub : true,
    }
  })
}
canva();

function canva1() {
  const canvas = document.querySelector("#page5>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
    /canva1/bridges00004.png
    /canva1/bridges00007.png
    /canva1/bridges00010.png
    /canva1/bridges00013.png
    /canva1/bridges00016.png
    /canva1/bridges00019.png
    /canva1/bridges00022.png
    /canva1/bridges00025.png
    /canva1/bridges00028.png
    /canva1/bridges00031.png
    /canva1/bridges00034.png
    /canva1/bridges00037.png
    /canva1/bridges00040.png
    /canva1/bridges00043.png
    /canva1/bridges00046.png
    /canva1/bridges00049.png
    /canva1/bridges00052.png
    /canva1/bridges00055.png
    /canva1/bridges00058.png
    /canva1/bridges00061.png
    /canva1/bridges00064.png
    /canva1/bridges00067.png
    /canva1/bridges00070.png
    /canva1/bridges00073.png
    /canva1/bridges00076.png
    /canva1/bridges00079.png
    /canva1/bridges00082.png
    /canva1/bridges00085.png
    /canva1/bridges00088.png
    /canva1/bridges00091.png
    /canva1/bridges00094.png
    /canva1/bridges00097.png
    /canva1/bridges00100.png
    /canva1/bridges00103.png
    /canva1/bridges00106.png
    /canva1/bridges00109.png
    /canva1/bridges00112.png
    /canva1/bridges00115.png
    /canva1/bridges00118.png
    /canva1/bridges00121.png
    /canva1/bridges00124.png
    /canva1/bridges00127.png
    /canva1/bridges00130.png
    /canva1/bridges00133.png
    /canva1/bridges00136.png
    /canva1/bridges00139.png
    /canva1/bridges00142.png
    /canva1/bridges00145.png
    /canva1/bridges00148.png
    /canva1/bridges00151.png
    /canva1/bridges00154.png
    /canva1/bridges00157.png
    /canva1/bridges00160.png
    /canva1/bridges00163.png
    /canva1/bridges00166.png
    /canva1/bridges00169.png
    /canva1/bridges00172.png
    /canva1/bridges00175.png
    /canva1/bridges00178.png
    /canva1/bridges00181.png
    /canva1/bridges00184.png
    /canva1/bridges00187.png
    /canva1/bridges00190.png
    /canva1/bridges00193.png
    /canva1/bridges00196.png
    /canva1/bridges00199.png
    /canva1/bridges00202.png
 `;
    return data.split("\n")[index];
  }

  const frameCount = 54;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.15,
      trigger: `#page5 canvas`,
      //   set start end according to preference
      start: `top top`,
      end: `600% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({

    trigger: "#page5",
    pin: true,
    // markers:true,
    scroller: `#main`,
    //   set start end according to preference
    start: `top top`,
    end: `600% top`,
  });
  gsap.to("#page4",{
    transform : "translateY(-100%)",
    scrollTrigger:{
      scroller : "#main",
      trigger : "#page4",
      start : "top top",
      end: "100% top",
      // markers : true,
      scrub : true,
    }
  })
}
canva1();

function canva2() {
  const canvas = document.querySelector("#page7>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
     https://thisismagma.com/assets/home/lore/seq/1.webp?2
https://thisismagma.com/assets/home/lore/seq/2.webp?2
https://thisismagma.com/assets/home/lore/seq/3.webp?2
https://thisismagma.com/assets/home/lore/seq/4.webp?2
https://thisismagma.com/assets/home/lore/seq/5.webp?2
https://thisismagma.com/assets/home/lore/seq/6.webp?2
https://thisismagma.com/assets/home/lore/seq/7.webp?2
https://thisismagma.com/assets/home/lore/seq/8.webp?2
https://thisismagma.com/assets/home/lore/seq/9.webp?2
https://thisismagma.com/assets/home/lore/seq/10.webp?2
https://thisismagma.com/assets/home/lore/seq/11.webp?2
https://thisismagma.com/assets/home/lore/seq/12.webp?2
https://thisismagma.com/assets/home/lore/seq/13.webp?2
https://thisismagma.com/assets/home/lore/seq/14.webp?2
https://thisismagma.com/assets/home/lore/seq/15.webp?2
https://thisismagma.com/assets/home/lore/seq/16.webp?2
https://thisismagma.com/assets/home/lore/seq/17.webp?2
https://thisismagma.com/assets/home/lore/seq/18.webp?2
https://thisismagma.com/assets/home/lore/seq/19.webp?2
https://thisismagma.com/assets/home/lore/seq/20.webp?2
https://thisismagma.com/assets/home/lore/seq/21.webp?2
https://thisismagma.com/assets/home/lore/seq/22.webp?2
https://thisismagma.com/assets/home/lore/seq/23.webp?2
https://thisismagma.com/assets/home/lore/seq/24.webp?2
https://thisismagma.com/assets/home/lore/seq/25.webp?2
https://thisismagma.com/assets/home/lore/seq/26.webp?2
https://thisismagma.com/assets/home/lore/seq/27.webp?2
https://thisismagma.com/assets/home/lore/seq/28.webp?2
https://thisismagma.com/assets/home/lore/seq/29.webp?2
https://thisismagma.com/assets/home/lore/seq/30.webp?2
https://thisismagma.com/assets/home/lore/seq/31.webp?2
https://thisismagma.com/assets/home/lore/seq/32.webp?2
https://thisismagma.com/assets/home/lore/seq/33.webp?2
https://thisismagma.com/assets/home/lore/seq/34.webp?2
https://thisismagma.com/assets/home/lore/seq/35.webp?2
https://thisismagma.com/assets/home/lore/seq/36.webp?2
https://thisismagma.com/assets/home/lore/seq/37.webp?2
https://thisismagma.com/assets/home/lore/seq/38.webp?2
https://thisismagma.com/assets/home/lore/seq/39.webp?2
https://thisismagma.com/assets/home/lore/seq/40.webp?2
https://thisismagma.com/assets/home/lore/seq/41.webp?2
https://thisismagma.com/assets/home/lore/seq/42.webp?2
https://thisismagma.com/assets/home/lore/seq/43.webp?2
https://thisismagma.com/assets/home/lore/seq/44.webp?2
https://thisismagma.com/assets/home/lore/seq/45.webp?2
https://thisismagma.com/assets/home/lore/seq/46.webp?2
https://thisismagma.com/assets/home/lore/seq/47.webp?2
https://thisismagma.com/assets/home/lore/seq/48.webp?2
https://thisismagma.com/assets/home/lore/seq/49.webp?2
https://thisismagma.com/assets/home/lore/seq/50.webp?2
https://thisismagma.com/assets/home/lore/seq/51.webp?2
https://thisismagma.com/assets/home/lore/seq/52.webp?2
https://thisismagma.com/assets/home/lore/seq/53.webp?2
https://thisismagma.com/assets/home/lore/seq/54.webp?2
https://thisismagma.com/assets/home/lore/seq/55.webp?2
https://thisismagma.com/assets/home/lore/seq/56.webp?2
https://thisismagma.com/assets/home/lore/seq/57.webp?2
https://thisismagma.com/assets/home/lore/seq/58.webp?2
https://thisismagma.com/assets/home/lore/seq/59.webp?2
https://thisismagma.com/assets/home/lore/seq/60.webp?2
https://thisismagma.com/assets/home/lore/seq/61.webp?2
https://thisismagma.com/assets/home/lore/seq/62.webp?2
https://thisismagma.com/assets/home/lore/seq/63.webp?2
https://thisismagma.com/assets/home/lore/seq/64.webp?2
https://thisismagma.com/assets/home/lore/seq/65.webp?2
https://thisismagma.com/assets/home/lore/seq/66.webp?2
https://thisismagma.com/assets/home/lore/seq/67.webp?2
https://thisismagma.com/assets/home/lore/seq/68.webp?2
https://thisismagma.com/assets/home/lore/seq/69.webp?2
https://thisismagma.com/assets/home/lore/seq/70.webp?2
https://thisismagma.com/assets/home/lore/seq/71.webp?2
https://thisismagma.com/assets/home/lore/seq/72.webp?2
https://thisismagma.com/assets/home/lore/seq/73.webp?2
https://thisismagma.com/assets/home/lore/seq/74.webp?2
https://thisismagma.com/assets/home/lore/seq/75.webp?2
https://thisismagma.com/assets/home/lore/seq/76.webp?2
https://thisismagma.com/assets/home/lore/seq/77.webp?2
https://thisismagma.com/assets/home/lore/seq/78.webp?2
https://thisismagma.com/assets/home/lore/seq/79.webp?2
https://thisismagma.com/assets/home/lore/seq/80.webp?2
https://thisismagma.com/assets/home/lore/seq/81.webp?2
https://thisismagma.com/assets/home/lore/seq/82.webp?2
https://thisismagma.com/assets/home/lore/seq/83.webp?2
https://thisismagma.com/assets/home/lore/seq/84.webp?2
https://thisismagma.com/assets/home/lore/seq/85.webp?2
https://thisismagma.com/assets/home/lore/seq/86.webp?2
https://thisismagma.com/assets/home/lore/seq/87.webp?2
https://thisismagma.com/assets/home/lore/seq/88.webp?2
https://thisismagma.com/assets/home/lore/seq/89.webp?2
https://thisismagma.com/assets/home/lore/seq/90.webp?2
https://thisismagma.com/assets/home/lore/seq/91.webp?2
https://thisismagma.com/assets/home/lore/seq/92.webp?2
https://thisismagma.com/assets/home/lore/seq/93.webp?2
https://thisismagma.com/assets/home/lore/seq/94.webp?2
https://thisismagma.com/assets/home/lore/seq/95.webp?2
https://thisismagma.com/assets/home/lore/seq/96.webp?2
https://thisismagma.com/assets/home/lore/seq/97.webp?2
https://thisismagma.com/assets/home/lore/seq/98.webp?2
https://thisismagma.com/assets/home/lore/seq/99.webp?2
https://thisismagma.com/assets/home/lore/seq/100.webp?2
https://thisismagma.com/assets/home/lore/seq/101.webp?2
https://thisismagma.com/assets/home/lore/seq/102.webp?2
https://thisismagma.com/assets/home/lore/seq/103.webp?2
https://thisismagma.com/assets/home/lore/seq/104.webp?2
https://thisismagma.com/assets/home/lore/seq/105.webp?2
https://thisismagma.com/assets/home/lore/seq/106.webp?2
https://thisismagma.com/assets/home/lore/seq/107.webp?2
https://thisismagma.com/assets/home/lore/seq/108.webp?2
https://thisismagma.com/assets/home/lore/seq/109.webp?2
https://thisismagma.com/assets/home/lore/seq/110.webp?2
https://thisismagma.com/assets/home/lore/seq/111.webp?2
https://thisismagma.com/assets/home/lore/seq/112.webp?2
https://thisismagma.com/assets/home/lore/seq/113.webp?2
https://thisismagma.com/assets/home/lore/seq/114.webp?2
https://thisismagma.com/assets/home/lore/seq/115.webp?2
https://thisismagma.com/assets/home/lore/seq/116.webp?2
https://thisismagma.com/assets/home/lore/seq/117.webp?2
https://thisismagma.com/assets/home/lore/seq/118.webp?2
https://thisismagma.com/assets/home/lore/seq/119.webp?2
https://thisismagma.com/assets/home/lore/seq/120.webp?2
https://thisismagma.com/assets/home/lore/seq/121.webp?2
https://thisismagma.com/assets/home/lore/seq/122.webp?2
https://thisismagma.com/assets/home/lore/seq/123.webp?2
https://thisismagma.com/assets/home/lore/seq/124.webp?2
https://thisismagma.com/assets/home/lore/seq/125.webp?2
https://thisismagma.com/assets/home/lore/seq/126.webp?2
https://thisismagma.com/assets/home/lore/seq/127.webp?2
https://thisismagma.com/assets/home/lore/seq/128.webp?2
https://thisismagma.com/assets/home/lore/seq/129.webp?2
https://thisismagma.com/assets/home/lore/seq/130.webp?2
https://thisismagma.com/assets/home/lore/seq/131.webp?2
https://thisismagma.com/assets/home/lore/seq/132.webp?2
https://thisismagma.com/assets/home/lore/seq/133.webp?2
https://thisismagma.com/assets/home/lore/seq/134.webp?2
https://thisismagma.com/assets/home/lore/seq/135.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2
 `;
    return data.split("\n")[index];
  }

  const frameCount = 180;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.15,
      trigger: `#page7 canvas`,
      //   set start end according to preference
      start: `top top`,
      end: `700% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({
    trigger: "#page7",
    pin: true,
    // markers:true,
    scroller: `#main`,
    //   set start end according to preference
    start: `top top`,
    end: `700% top`,
    onUpdate: (d) => {
      per = Math.floor((d.progress)*120)
      if(per <= 60){
        document.querySelector(".inner-circle h2").innerHTML = per + "%"
      }
    }
  });
  gsap.to("#page6",{
    transform : "translateY(-100%)",
    scrollTrigger:{
      scroller : "#main",
      trigger : "#page6",
      start : "top top",
      end: "100% top",
      // markers : true,
      scrub : true,
    }
  })

  gsap.from("#page7 canvas", {
    opacity: 0,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page7",
      start: "top top",
      end: "top -10%",
      scrub: true,
      // markers:true
    }
  })
  gsap.from("#page7 .circle", {
    width: "28vh",
    // duration : 15,
    scrollTrigger: {
      trigger: "#page7",
      scroller: "#main",
      start: `top top`,
      end: `700% top`,
      // pin :true,
      // markers :true,
      scrub: 1,
    }
  })
}
canva2();

function lastcanvas() {
  const canvas = document.querySelector("#page9 canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
    https://thisismagma.com/assets/home/roadmap/seq/1.jpg
    https://thisismagma.com/assets/home/roadmap/seq/2.jpg
    https://thisismagma.com/assets/home/roadmap/seq/3.jpg
    https://thisismagma.com/assets/home/roadmap/seq/4.jpg
    https://thisismagma.com/assets/home/roadmap/seq/5.jpg
    https://thisismagma.com/assets/home/roadmap/seq/6.jpg
    https://thisismagma.com/assets/home/roadmap/seq/7.jpg
    https://thisismagma.com/assets/home/roadmap/seq/8.jpg
    https://thisismagma.com/assets/home/roadmap/seq/9.jpg
    https://thisismagma.com/assets/home/roadmap/seq/10.jpg
    https://thisismagma.com/assets/home/roadmap/seq/11.jpg
    https://thisismagma.com/assets/home/roadmap/seq/12.jpg
    https://thisismagma.com/assets/home/roadmap/seq/13.jpg
    https://thisismagma.com/assets/home/roadmap/seq/14.jpg
    https://thisismagma.com/assets/home/roadmap/seq/15.jpg
    https://thisismagma.com/assets/home/roadmap/seq/16.jpg
    https://thisismagma.com/assets/home/roadmap/seq/17.jpg
    https://thisismagma.com/assets/home/roadmap/seq/18.jpg
    https://thisismagma.com/assets/home/roadmap/seq/19.jpg
    https://thisismagma.com/assets/home/roadmap/seq/20.jpg
    https://thisismagma.com/assets/home/roadmap/seq/21.jpg
    https://thisismagma.com/assets/home/roadmap/seq/22.jpg
    https://thisismagma.com/assets/home/roadmap/seq/23.jpg
    https://thisismagma.com/assets/home/roadmap/seq/24.jpg
    https://thisismagma.com/assets/home/roadmap/seq/25.jpg
    https://thisismagma.com/assets/home/roadmap/seq/26.jpg
    https://thisismagma.com/assets/home/roadmap/seq/27.jpg
    https://thisismagma.com/assets/home/roadmap/seq/28.jpg
    https://thisismagma.com/assets/home/roadmap/seq/29.jpg
    https://thisismagma.com/assets/home/roadmap/seq/30.jpg
    https://thisismagma.com/assets/home/roadmap/seq/31.jpg
    https://thisismagma.com/assets/home/roadmap/seq/32.jpg
    https://thisismagma.com/assets/home/roadmap/seq/33.jpg
    https://thisismagma.com/assets/home/roadmap/seq/34.jpg
    https://thisismagma.com/assets/home/roadmap/seq/35.jpg
    https://thisismagma.com/assets/home/roadmap/seq/36.jpg
    https://thisismagma.com/assets/home/roadmap/seq/37.jpg
    https://thisismagma.com/assets/home/roadmap/seq/38.jpg
    https://thisismagma.com/assets/home/roadmap/seq/39.jpg
    https://thisismagma.com/assets/home/roadmap/seq/40.jpg
    https://thisismagma.com/assets/home/roadmap/seq/41.jpg
    https://thisismagma.com/assets/home/roadmap/seq/42.jpg
    https://thisismagma.com/assets/home/roadmap/seq/43.jpg
    https://thisismagma.com/assets/home/roadmap/seq/44.jpg
    https://thisismagma.com/assets/home/roadmap/seq/45.jpg
    https://thisismagma.com/assets/home/roadmap/seq/46.jpg
    https://thisismagma.com/assets/home/roadmap/seq/47.jpg
    https://thisismagma.com/assets/home/roadmap/seq/48.jpg
    https://thisismagma.com/assets/home/roadmap/seq/49.jpg
    https://thisismagma.com/assets/home/roadmap/seq/50.jpg
    https://thisismagma.com/assets/home/roadmap/seq/51.jpg
    https://thisismagma.com/assets/home/roadmap/seq/52.jpg
    https://thisismagma.com/assets/home/roadmap/seq/53.jpg
    https://thisismagma.com/assets/home/roadmap/seq/54.jpg
    https://thisismagma.com/assets/home/roadmap/seq/55.jpg
    https://thisismagma.com/assets/home/roadmap/seq/56.jpg
    https://thisismagma.com/assets/home/roadmap/seq/57.jpg
    https://thisismagma.com/assets/home/roadmap/seq/58.jpg
    https://thisismagma.com/assets/home/roadmap/seq/59.jpg
    https://thisismagma.com/assets/home/roadmap/seq/60.jpg
    https://thisismagma.com/assets/home/roadmap/seq/61.jpg
    https://thisismagma.com/assets/home/roadmap/seq/62.jpg
    https://thisismagma.com/assets/home/roadmap/seq/63.jpg
    https://thisismagma.com/assets/home/roadmap/seq/64.jpg
    https://thisismagma.com/assets/home/roadmap/seq/65.jpg
    https://thisismagma.com/assets/home/roadmap/seq/66.jpg
    https://thisismagma.com/assets/home/roadmap/seq/67.jpg
    https://thisismagma.com/assets/home/roadmap/seq/68.jpg
    https://thisismagma.com/assets/home/roadmap/seq/69.jpg
    https://thisismagma.com/assets/home/roadmap/seq/70.jpg
    https://thisismagma.com/assets/home/roadmap/seq/71.jpg
    https://thisismagma.com/assets/home/roadmap/seq/72.jpg
    https://thisismagma.com/assets/home/roadmap/seq/73.jpg
    https://thisismagma.com/assets/home/roadmap/seq/74.jpg
    https://thisismagma.com/assets/home/roadmap/seq/75.jpg
 `;
    return data.split("\n")[index];
  }

  const frameCount = 75;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.15,
      trigger: `#page9 canvas`,
      //   set start end according to preference
      start: `top top`,
      end: `600% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.min(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }

  ScrollTrigger.create({

    trigger: "#page9",
    pin: true,
    // markers:true,
    scroller: `#main`,
    //   set start end according to preference
    start: `top top`,
    end: `600% top`,
  });
}
lastcanvas();

function breakmagma() {
  var clutter3 = " ";
  document.querySelector(".text-box h1").textContent.split("").forEach(function (e) {
    clutter3 += `<span>${e}</span>`
  })
  document.querySelector(".text-box h1").innerHTML = clutter3;

}
breakmagma();

function textmotion() {
  var clutter = " ";
  document.querySelector("#page2 h1").textContent.split("").forEach(function (e) {
    clutter += `<span>${e}</span>`
  })
  document.querySelector("#page2 h1").innerHTML = clutter;

  gsap.to("#page2 h1 span", {
    color: "white",
    stagger: .2,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page2",
      start: "top 70%",
      end: "top 0%",
      // markers: true,
      scrub: 1.5,
    }
  })
  var clutter1 = " ";
  document.querySelector("#page4 h1").textContent.split("").forEach(function (e) {
    clutter1 += `<span>${e}</span>`
  })
  document.querySelector("#page4 h1").innerHTML = clutter1;
  gsap.to("#page4 h1 span", {
    color: "white",
    stagger: .2,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page4",
      start: "top 70%",
      end: "top 0%",
      // markers: true,
      scrub: 1.2,
    }
  })
  var clutter2 = " ";
  document.querySelector("#page6 h1").textContent.split("").forEach(function (e) {
    clutter2 += `<span>${e}</span>`
  })
  document.querySelector("#page6 h1").innerHTML = clutter2;
  gsap.to("#page6 h1 span", {
    color: "white",
    stagger: .2,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page6",
      start: "top 70%",
      end: "top 0%",
      // markers: true,
      scrub: 1.2,
    }
  })
}
textmotion();

function page7_page8() {
  var tm = gsap.timeline({
    scrollTrigger: {
      trigger: "#page7",
      scroller: "#main",
      start: `top top`,
      end: `700% top`,
      // pin :true,
      // markers :true,
      scrub: 1,
    }
  });
  tm
    .from("#page7 .circle", {
      opacity: 0,
      duration: 1,
    })

    .to(".inner-circle h4,.inner-circle h2", {
      opacity: 0,
      scale: .8,
      duration: 5,
      delay: 25,
    })
    .to("#page7 .imgcircle", {
      opacity: 1,
      scale: 1,
      duration: 2,
    })
    .to("#page7 .circle", {
      width: "10vh",
      opacity: 0,
      duraton: 10,
    }, "A")
    .from("#page8", {
      opacity: 0,
      scale: 2,
      duration: 4,
    })
    .from(".text-box h1 span", {
      y: 100,
      transform: "rotate(30deg)",
      stagger: .01,
      duration: 5,
    }, "a")
    .from(".textbox button", {
      y: 100,
      opacity: 0,
      duration: 5,
    }, "a")
}
page7_page8();


function loading(){
  var a =0 ;
let int = setInterval(()=>{
  a++;
  if(a<=100){
    document.querySelector(".textpart h2").innerHTML = a + "%"
  }
  else{
    clearInterval(int);
  }
},10)
}
var tl1 = gsap.timeline({
  delay : 1,
})
tl1.to(".textpart h1,.textpart h2",{
  top : "0%",
  stagger : .1,
  duration : 1,
  rotate : "0deg",
})
.call(loading)
.to(".textpart h1, .textpart h2",{
  top : "-100%",
  delay : 1.5,
})
.to("#intropage",{
  top : "100%",
  display : "none",
},"a")
.to(".white-overlay",{
  top : "100%",
  duration : 1,
  display : "none",
},"a")
.to(".blue-overlay",{
  top : "0%",
  duration : 1,
},"a")
.to(".blue-overlay",{
  opacity : 0,
  duration : .5,
  display : "none",
},"b")


// gsap.to("#page9 .left-text",{
//   transform: "translateY(-150%)",
//   scrollTrigger:{
//     trigger :"#page9",
//     scroller : "#main",
//     start: "top top",
//     end : "600% top",
//     scrub : 1,
//     pin: true,
//     markers: true,
//   }
// })

function page9_gsap() {

  var tm3 = gsap.timeline({
    scrollTrigger: {
      trigger: "#page9",
      scroller: "#main",
      start: "top top",
      end: "600% top",
      scrub: true,
      // markers: true,
    }
  })

  tm3
    .to(".firstbox", {
      color: "white",
      duration: .1,
    })
    .to("#page9 .leftheader", {
      transform: "translateY(-130%)",
    }, "a")
    .to(".firstbox", {
      color: "#ffffff59"
    }, "a")
    .to("#page9 .left-textboxes", {
      transform: "translateY(-100%)",
    }, "a")
    .to(".secondbox", {
      color: "white"
    }, "a")
    .to("#page9 .left-textboxes", {
      transform: "translateY(-200%)",
    }, "b")
    .to(".secondbox", {
      color: "#ffffff59"
    }, "b")
    .to(".thirdbox", {
      color: "white",
    }, "b")
    .to(".thirdbox", {
      color: "#ffffff59",
    }, "c")
    .to("#page9 .left-textboxes", {
      transform: "translateY(-300%)",
    }, "c")
    .to(".lastbox", {
      color: "white"
    }, "c")
    .to(".lastbox", {
      color: "#ffffff59",
      duration : .01,
    })
}
page9_gsap();

var cursor = document.querySelector(".white-cursor")
document.addEventListener("mousemove", function (dets) {
  gsap.to(cursor, {
    left: dets.x - cursor.clientWidth / 2,
    top: dets.y - cursor.clientHeight / 2,
  })
})
document.querySelector("#footer").addEventListener("mouseenter", function () {
  gsap.to(cursor, {
    scale: 1,
  })
})
document.querySelector("#footer").addEventListener("mouseleave", function () {
  gsap.to(cursor, {
    scale: 0,
  })
})






