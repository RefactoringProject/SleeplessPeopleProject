package mainproject.nosleep.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import mainproject.nosleep.image.entity.Image;
import mainproject.nosleep.member.entity.Member;
import mainproject.nosleep.opencheck.entity.OpenCheck;
import mainproject.nosleep.review.entity.Review;
import mainproject.nosleep.review.entity.ReviewStatus;
import mainproject.nosleep.shop.dto.ShopRequestDto;
import mainproject.nosleep.shop.entity.Shop;

import java.util.ArrayList;
import java.util.List;

public class ReviewRequestDto {

    @Getter
    @AllArgsConstructor
    public static class Create{
        private Long shopId;
        private Long memberId;
        private String writer;
        //사진

        private Integer rating;
        private String content;
        private Boolean openCheck;

        private List<String> imageList;
        public Integer getRating(){ // 별점 범위
            try {
                if (rating > 5 || rating < 0) {
                    new IllegalAccessException("올바른 별점으로 입력해야합니다.");
                }
            }
            catch (Exception e){
                e.getMessage();
            }
            return rating;
        }

        public Member getMember(){
            Member member = new Member();
            member.setId(memberId);
            return member;
        }

        public Shop getShop(){
            Shop shop = new Shop();
            if(shopId != null) // null 이면 예외처리 필요
                shop.setId(shopId);
            return shop;
        }
        public OpenCheck getOpenCheck(){

            OpenCheck openCheck1 = new OpenCheck();
            openCheck1.setOpenTrue(this.openCheck);
            openCheck1.setMember(getMember());
            openCheck1.setShop(getShop());

            return openCheck1;
        }


    }

    @Getter
    @AllArgsConstructor
    public static class Update{

        private Integer rating;
        private String content;
        private List<String> imageList;


    }
}
