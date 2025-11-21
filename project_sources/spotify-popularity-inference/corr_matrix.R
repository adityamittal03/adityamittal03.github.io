#!/usr/bin/env Rscript
suppressPackageStartupMessages({
  library(ggplot2)
})

csv_path <- "static/projects/spotify-popularity/data/song_data.csv"
out_path <- "static/projects/spotify-popularity/plots/corr_matrix.png"

if (!file.exists(csv_path)) {
  stop(sprintf("CSV not found at %s", csv_path))
}

df <- read.csv(csv_path, stringsAsFactors = FALSE)

# Select numeric feature columns in a stable, intended order
num_cols <- c(
  "song_popularity","song_duration_ms","acousticness","danceability",
  "energy","instrumentalness","key","liveness","loudness","audio_mode",
  "speechiness","tempo","time_signature","audio_valence"
)

missing <- setdiff(num_cols, names(df))
if (length(missing) > 0) {
  stop(sprintf("Missing expected columns: %s", paste(missing, collapse = ", ")))
}

num_df <- df[ , num_cols]

# Compute Pearson correlation matrix
corr <- suppressWarnings(cor(num_df, use = "pairwise.complete.obs", method = "pearson"))

# Long format for ggplot
corr_df <- as.data.frame(as.table(round(corr, 3)))
names(corr_df) <- c("Var1", "Var2", "Corr")
corr_df$Var1 <- factor(corr_df$Var1, levels = num_cols)
corr_df$Var2 <- factor(corr_df$Var2, levels = num_cols)

p <- ggplot(corr_df, aes(x = Var2, y = Var1, fill = Corr)) +
  geom_tile(color = NA) +
  scale_fill_gradient2(low = "#2166ac", mid = "#FFFFFF", high = "#b2182b",
                       limits = c(-1, 1), name = "r") +
  coord_fixed() +
  scale_x_discrete(position = "top") +
  labs(title = "Correlation Matrix — Spotify Features",
       subtitle = "Pearson correlations across numeric features",
       x = NULL, y = NULL) +
  theme_minimal(base_size = 10) +
  theme(
    axis.text.x = element_text(angle = 45, hjust = 0),
    panel.grid = element_blank(),
    legend.position = "right",
    plot.title = element_text(hjust = 0.5, face = "bold"),
    plot.subtitle = element_text(hjust = 0.5)
  )

dir.create(dirname(out_path), recursive = TRUE, showWarnings = FALSE)
ggsave(filename = out_path, plot = p, width = 9, height = 7, dpi = 150, bg = "white")
message(sprintf("Saved correlation matrix plot to %s", out_path))

