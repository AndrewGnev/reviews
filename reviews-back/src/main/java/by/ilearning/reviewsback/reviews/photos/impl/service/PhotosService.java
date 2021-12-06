package by.ilearning.reviewsback.reviews.photos.impl.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.Singleton;
import com.cloudinary.utils.ObjectUtils;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class PhotosService {

    private final Cloudinary cloudinary = Singleton.getCloudinary();
    private final Set<String> supportedImageFormats = new HashSet<>(
            Arrays.asList("JPG", "PNG", "GIF", "BMP", "ICO", "SVG")
    );

    public String uploadImage(MultipartFile image) throws IOException, NotFoundException {

        assertImage(image);

        Map uploadResult = cloudinary.uploader()
                .upload(image.getBytes(), ObjectUtils.asMap("resource_type", "image"));

        return (String) uploadResult.get("url");
    }

    private void assertImage(MultipartFile image) {

        if (image == null || image.getOriginalFilename() == null)
            throw new IllegalArgumentException("Image can not be null");

        String fileName = image.getOriginalFilename();
        String[] parts = fileName.split("\\.");
        String format = parts[parts.length - 1];

        if (!supportedImageFormats.contains(format.toUpperCase()) || parts.length < 2)
            throw new UnsupportedOperationException(format + " format isn`t supported");
    }
}
