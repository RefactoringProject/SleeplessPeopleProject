package mainproject.nosleep.review.service;

import lombok.RequiredArgsConstructor;
import mainproject.nosleep.opencheck.repository.OpenCheckRepository;
import mainproject.nosleep.opencheck.service.OpenCheckService;
import mainproject.nosleep.review.entity.Review;
import mainproject.nosleep.review.repository.ReviewRepository;
import mainproject.nosleep.shop.entity.Shop;
import mainproject.nosleep.shop.repository.ShopRepository;
import mainproject.nosleep.shop.service.ShopService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ShopRepository shopRepository;

    private final OpenCheckRepository openCheckRepository;
    private final ImageService imageService;

    @Transactional
    public Review createReview(Review review){
        review.getOpenCheck().addReview(review);
        Review save = reviewRepository.save(review);

        imageService.updateImage(images, save);

        Long shopId = save.getShop().getId();
        //평점 계산
        Double ratingAverage = findRatingAverage(shopId);
        // 이용후기 + 1, 평점 갱신

        List<BigInteger[]> objects = openCheckRepository.allPeopleNumberAndCountOpenNumber(shopId);
        Long visitorCount = objects.get(0)[0].longValue();;
        Long openCount = objects.get(0)[1].longValue();

        shopRepository.updateShopData(shopId, ratingAverage, visitorCount, openCount); // transactional

        return save;
    }
    public Review updateReview(Long id, Review review, List<String> images){
        Review updateReview = findVerifiedReview(id);
        Optional.ofNullable(review.getRating()).ifPresent(updateReview::setRating);
        Optional.ofNullable(review.getContent()).ifPresent(updateReview::setContent);
        if(images.size() >0){imageService.updateImage(images, updateReview);}
        return reviewRepository.save(updateReview); // 더티체킹
    }
    public Review findReview(Long id){
        Review verifiedReview = findVerifiedReview(id);
        //좋아요 이슈
        return verifiedReview;
    }
    public Page<Review> findReviews(int page, Long shopId, String sort){
        Shop shop = new Shop();
        shop.setId(shopId);
        return reviewRepository.findByShop(shop, PageRequest.of(page, 10,  Sort.by(sort).descending()));


    }


    public void deleteReview(Long id){
        Review verifiedReview = findVerifiedReview(id);
        // 삭제 로직 생각할 필요
        reviewRepository.delete(verifiedReview); //바로 삭제
    }

    private Review findVerifiedReview(Long id){
        Optional<Review> optionalReview = reviewRepository.findById(id);
        return optionalReview.orElseThrow(
                ()-> new IllegalArgumentException("존재하지않는 이용후기 입니다.")
        );
    }
    public Double findRatingAverage(Long shopId){
        List<Object[]> objects = reviewRepository.averageAndCountAllRating(shopId);
        return (Double) objects.get(0)[0];
    }


    public void upvoteCountPlus(Review review){
        reviewRepository.upvotePlus(review.getId());
    }
    public void upvoteCountMinus(Review review){
        reviewRepository.upvoteMinus(review.getId());
    }
}
