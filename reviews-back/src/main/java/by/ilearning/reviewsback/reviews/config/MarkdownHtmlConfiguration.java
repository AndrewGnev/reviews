package by.ilearning.reviewsback.reviews.config;

import org.commonmark.parser.Parser;
import org.commonmark.renderer.html.HtmlRenderer;
import org.jsoup.nodes.Document;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MarkdownHtmlConfiguration {

    @Bean
    public HtmlRenderer markdownHtmlRenderer() {
        return HtmlRenderer.builder().build();
    }

    @Bean
    public Parser markdownParser() {
        return Parser.builder().build();
    }

    @Bean
    public Document.OutputSettings jsoupOutputSettings() {
        Document.OutputSettings outputSettings = new Document.OutputSettings();
        outputSettings.prettyPrint(false);

        return outputSettings;
    }
}
