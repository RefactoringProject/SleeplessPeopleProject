package mainproject.nosleep.shop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mainproject.nosleep.image.entity.Image;
import mainproject.nosleep.review.dto.ReviewResponseDto;
import mainproject.nosleep.review.entity.Review;

import java.util.List;
import java.util.stream.Collectors;

public class ShopResponseDto {
    @Getter
    @Setter
    @AllArgsConstructor
    public static class TotalPage{
        //이미지, 가게명, 주소, 평점
        private String image;
        private String name;
        private String address;
        private Double ratingAVG;
        private List<String> images;
        public void setImages(List<Image> images){
            this.images = images.stream()
                    .map(Image::getUrl)
                    .collect(Collectors.toList());
        }
    }

    @Setter
    @Getter
    @NoArgsConstructor
    public static class CreateDetailPage{
        private Long id;
        //사업장 명
        private String name;
        //주소
        private String address;
        //설명
        private String detail;

        //좌표
        private Double longitude;
        private Double latitude;

        private Double ratingAVG;
        //이용후기 리스트
        private Long reviewCount;

    }

    @Setter
    @Getter
    @NoArgsConstructor
    public static class ReadDetailPage{

        private Long id;
        //사업장 명
        private String name;
        //주소
        private String address;
        //설명
        private String detail;

        //좌표
        private Double longitude;
        private Double latitude;

        private Double ratingAVG;
        //이용후기 리스트
        private Long reviewCount;

        private Long visitorCount;

        private Long openCount;
        private List<String> images;
        private List<ReviewResponseDto.ShortReview> reviews; // reviewDTO 필요

        public void setImages(List<Image> images){
            this.images = images.stream()
                    .map(Image::getUrl)
                    .collect(Collectors.toList());
        }

        public void setReviews(List<Review> reviews) {
            this.reviews = reviews.stream().map(
                    review -> {
                        ReviewResponseDto.ShortReview shortReview = new ReviewResponseDto.ShortReview();
                        shortReview.setId(review.getId());
                        shortReview.setNickname(review.getMember().getNickname());
                        shortReview.setRating(review.getRating());
                        shortReview.setContent(review.getContent());
                        return shortReview;
        }).collect(Collectors.toList());
        }
    }
    @Setter
    @Getter
    @NoArgsConstructor
    public static class ReadListPage{
        private Long id;
        private String name;
        private String address;
        private Double longitude;
        private Double latitude;
        private Double ratingAVG;
        private Long reviewCount;
        private Long visitorCount;
        private Long openCount;
        private List<String> images;

        public void setImages(List<Image> images){
            this.images = images.stream()
                    .map(Image::getUrl)
                    .collect(Collectors.toList());
        }
    }
}
