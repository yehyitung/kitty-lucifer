<template>
  <div>
    <div class="pt-5 pb-5 mt-5 mb-5">
      <div class="site-section" data-aos="fade">
        <div class="container">
          <div class="row">
            <div class="col-md-7">
              <div class="site-section-heading pt-3 mb-3">
                <h2 class="text-black">Contact</h2>
              </div>
              <div class="p-4 mb-3 info-hover">
                <p class="d-flex mb-0">
                  <span class="d-block text-primary h4 text-uppercase mb-0"><i class="fas fa-phone-alt mr-3 mb-3"></i></span>
                  <span class="h5 mb-0"><a class="text-secondary" href="tel:+886-2-1234567">02-1234-5678</a></span>
                </p>
                <p class="d-flex mb-0">
                  <span class="d-block text-primary h4 text-uppercase mb-0"><i class="fas fa-envelope mr-3 mb-3"></i></span>
                  <span class="h5 mb-0"><a class="text-secondary" href="mailto:aatung0913@gmail.com">aatung0913@gmail.com</a></span>
                </p>
                <p class="d-flex mb-0">
                  <span class="d-block text-primary h4 text-uppercase mb-0"><i class="fas fa-map-marker-alt mr-3"></i></span>
                  <span class="h5 mb-0 font-color">台北市士林區士東路100號2樓</span>
                </p>
              </div>
              <form class="form-row p-4 mb-3 pt-3" action="https://formspree.io/f/mdopbzon"
              method="POST">
                <div class="col-6 pb-3">
                  <label for="name" class="label text-primary h6">Name.
                    <input id="userName" class="input ml-2" type="text" placeholder="請輸入姓名" name="name">
                  </label>
                </div>
                <div class="col-6 pb-3">
                  <label for="tel" class="label text-primary h6">Tel.
                    <input id="userTel" class="input ml-2" type="tel" placeholder="請輸入電話" name="tel">
                  </label>
                </div>
                <div class="col-12 pb-3">
                  <label for="email" class="label text-primary h6">Email.
                    <input id="userEmail" class="input ml-2 form-mail" type="email" placeholder="請輸入信箱" name="email">
                  </label>
                </div>
                <div class="col-12">
                  <label for="content" class="label text-primary h6">Content.
                    <textarea id="userMessage" class="input ml-2" rows="5" cols="53" style="resize: none;" placeholder="請在此輸入內容" name="content"></textarea>
                  </label>
                </div>
                <button type="submit" class="btn btn-m btn-primary mt-4">確認送出</button>
              </form>
            </div>
            <div class="col-md-5 d-none d-md-block d-lg-block d-xl-block">
              <div class="block-16">
                <div class="iframe-rwd">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.7005817275804!2d121.52716681523252!3d25.111994983935926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ae845baeb919%3A0xd9e9ba1a373147a!2zMTEx5Y-w5YyX5biC5aOr5p6X5Y2A5aOr5p2x6LevMTAw6JmfMuaokw!5e0!3m2!1szh-TW!2stw!4v1611210724984!5m2!1szh-TW!2stw" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .font-color{
    color: #5a6269;
    font-size: 18px;
  }
  .input{
    padding: 5px;
    ::placeholder{
      font-size: 10px;
    }
  }
  .form-mail{
    width: 465px;
  }
</style>